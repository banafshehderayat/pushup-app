import {Strategy} from 'passport-jwt';
//let JwtStrategy = require('passport-jwt').Strategy;

// load up the user model
import User from '../models/user';
import config from '../config/database';
//let User = require('../models/user');
//let config = require('../config/database'); // get db config file

module.exports = function(passport) {
  let opts = {};
  opts.secretOrKey = config.secret;
  passport.use(new Strategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};
