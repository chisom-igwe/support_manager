const express = require('express'); 
const router = express.Router(); 

const config = require('../config'); 
const allowOnly = require('../services/routesHelper').allowOnly;
const authController = require('../controllers/authController');
const UserController = require('../controllers/userController');
const AdminController = require('../controllers/adminController');

var userRouter = function(passport){
	router.post('/register', authController.signUp);
	router.post('/login', authController.authenticateUser);

	router.get('/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));
	router.get('/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AdminController.index));
	return router; 
}
module.exports = userRouter;