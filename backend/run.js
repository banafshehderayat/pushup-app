/**
 * Run this to run your application.
 *
 * Everything in this file must follow es5.
 */

require('babel-register');
require('babel-preset-es2015');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var morgan  = require('morgan');
var bodyParser   = require('body-parser');
var port     = process.env.PORT || 8080;
var jwt = require('jwt-simple');
var config = require('./config/database');
var User = require('./models/user');
var Workout = require('./models/workout');


var app = express();


app.use(passport.initialize());

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// demo Route (GET http://localhost:8080)
app.get('/', function(req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// connect to database
mongoose.connect(config.database);

// pass passport for configuration
require('./config/passport')(passport);



// bundle our routes
var apiRoutes = express.Router();

// create a new user account (POST http://localhost:8080/signup)
apiRoutes.post('/signup', function(req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password,
      status: 0
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

 //route to authenticate a user (POST http://localhost:8080/authenticate)
apiRoutes.post('/authenticate', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      console.log(user);
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

// route to a restricted info (GET http://localhost:8080/profile)
apiRoutes.get('/profile', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          res.json({success: true, msg: 'Welcome in the member area ' + user.name + '! Your status is' + user.status+ ' And your test is:' + user.test});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});


apiRoutes.post('/update', passport.authenticate('jwt', { session: false}), function(req, res){
  var token = getToken(req.headers);
  var newStatus = req.body.newStatus;
  var newTest = req.body.newTest;
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOneAndUpdate({name: decoded.name}, {status: newStatus, test: newTest}, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!' + ' status ' + user.status + ' test '+ user.test});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});


apiRoutes.post('/ranking', function(req, res){
  var statusArray = req.body.statusArray;
  var test = req.body.test;
  var statusWeek = statusArray[0];


  res.json({ranking});
});

apiRoutes.post('/workout',  function(req, res){
  var statusArray = req.body.statusArray;
  var test = req.body.test;
  var weekNum = 0;
  var dayNum = 0;
  var statusWeek = statusArray[0];
  var statusDay = statusArray[1];
  var ranking = 0;
  // based on initial test find out if user starts from first week or week 3
  if (statusWeek == 0){
    if (test < 5){
      ranking = 1;
      weekNum = 1;
      dayNum = 1;
    } else if (test >= 6 && test <= 10) {
      ranking = 2;
      weekNum = 1;
      dayNum = 1;
    } else if (test >= 11 && test <= 20) {
      ranking = 3;
      weekNum = 1;
      dayNum = 1;
    } else if (test >= 21 && test <= 25){
      ranking = 2;
      weekNum = 3;
      dayNum = 1;
    } else {
      ranking = 3;
      weekNum = 3;
      dayNum = 1;
    }
    // if initial test has already been done
  } else {
    if (statusWeek == 1 || statusWeek == 2){
      if (test < 5){
        ranking = 1;
      } else if (test >= 6 && test <= 10) {
        ranking = 2;
      } else if (test >= 11 && test <= 20) {
        ranking = 3;
      }
    } else if (statusWeek == 3 || statusWeek == 4){
     if (test >= 16 && test <= 20){
       ranking = 1;
     }else if (test >= 21 && test <= 25){
       ranking = 2;
     } else {
       ranking = 3;
     }
   } else if (statusWeek == 5 || statusWeek == 6){
     if (test >= 31 && test <= 35){
       ranking = 1;
     }
     else if (test >= 36 && test <= 40){
       ranking = 2;
     } else {
       ranking = 3;
     }
   }
   if (statusDay == 1 || statusDay == 2) {
     weekNum = statusWeek;
     dayNum = statusDay + 1;
   } else if (statusDay == 3){
     weekNum = statusWeek + 1;
     dayNum = 1;
   } else {
     return res.status(403).send({msg: 'Invalid status!'});
   }
  }

  Workout.findOne({
    week : weekNum,
    day: dayNum,
    column: ranking
  }, function(err, workout){
    if (err) throw err;
    if (!workout) {
      return res.status(403).send({msg: 'No workout found!'});
    } else {
      res.json({msg: workout});
    }
  });
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// connect the api routes under /api/*
app.use('/api/', apiRoutes);

// Start the server
app.listen(port);
console.log('There will be dragons: http://localhost:' + port);

// var main = require('./src/main').default;
//
// main([['Booby', 'black'], ['Bibi', 'pink']]);
