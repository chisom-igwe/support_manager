'use strict'

//import modules 
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;

const user = require('./../models/user');
const config = require('../config/config');

module.exports.hookJwtstrategy(passport){
	var options = {};
    
    options.secretOrKey = config.keys.secret;
    options.jwtFromRequest = extractJwt.fromAuthHeader();
    options.ignoreExpiration = false;

    passport.use(new jwtStrategy(options, function(JWTPayload, callback) {
        User.findOne({ where: { username: JWTPayload.username } })
            .then(function(user) {
                if(!user) {
                    callback(null, false);
                    return;
                }

                callback(null, user);
            }); 
     }));
}