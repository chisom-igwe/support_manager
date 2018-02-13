// The User model.
'use strict'; 

//import modules 
const bcrypt = require('bcryptjs');
const database = require('../services/database');
const config = require('../config');
const mysql = require('mysql'); 
const sequelize = require('sequelize');


// User Schema 
var modelDefinition = {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.INTEGER,
        defaultValue: config.userRoles.user
	}

};

var modelOptions = {
	instanceMethods:{
		comparePasswords: comparePasswords
	}
	hooks: {
        beforeValidate: hashPassword
	}
};

//define User model 
var userModel = database.define( 'user', modelDefinition, modelOptions); 

//Compare Passwords

function comparePasswords(password, callback){
	bcrypt.compare(password, this.password, function(erros, isMatch){
		if(error){
			return callback(error); 
		}
		return callback(null, isMatch); 
	});
}

function hashPassword(user){
	if(user.changes('password')){
		return bcrypt.hash(user.password, 10).then(function(password){
			user.password = password; 
		});
	}
}

module.exports = userModel;