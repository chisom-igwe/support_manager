'use strict';

const config = require('../config'); 
const database = require('../services/database');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

//Authenication controller
var authController = {}; 


//Signup a user 
authController.signUp = function(req, res){
	if(!req.body.username || !req.body.password){
		res.json({message: 'Please provide a username and a password.'});
	}else{
		database.sync().then(function(){
			var newUser = {
				username: req.body.username, 
				password: req.body.password
			};

			return user.create(newUser).then(function(){
				res.status(201).json({message: 'Account Created! '});
			});
		}).catch(function(error){
			console.log(error); 
			res.status(403).json({message: 'Username already exists'});
		});
	}
}


//authenticate a user 

authController.authenticateUser = function(req, res){
	if(!req.body.username || !req.body.password){
		res.status(404).json({message: "Username and password are required! "});
	}else{
		 var username = req.body.username,	
		 	password = req.body.password,
			potentialUser = { where: { username: username } };

			if user.findOne(potentialUser).then(function(user){
				if(!user){
					res.status(404).json({message: 'Authenication Failed'}); 
				}else{
					user.comparePasswords(password, function(error, isMatch){
						if(isMatch && !error){
							var token = jwt.sign(
								{username: user.username}, 
								config.keys.secret, 
								{ expiresIn: '30m' }
							); 
							res.json({
								success: true,
                            	token: 'JWT ' + token,
								role: user.role
							});
						}
					});
				}
			}).catch(function(error) {
            	res.status(500).json({ message: 'There was an error!' });
			});
	}
}
module.exports = authController;

