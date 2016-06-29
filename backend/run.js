/**
 * Run this to run your application.
 *
 * Everything in this file must follow es5.
 */

require('babel-register');
require('babel-preset-es2015');
var express = require('express');
var debug = require('debug');
var path = require('path');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();

app.use('/', routes);
app.use('/users', users);

//app.set('views', '/home/banafsheh/git/pushup-app/frontend/views' );

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;


// var main = require('./src/main').default;
//
// main([['Booby', 'black'], ['Bibi', 'pink']]);
