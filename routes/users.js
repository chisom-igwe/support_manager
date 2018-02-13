const express = require('express'); 
const router = express.Router(); 

const config = require('../config'); 
const allowOnly = require('../services/routesHelper').allowOnly;
const authController = require('../controllers/authController');

router.post('/register', authController.signUp);

router.post('/login', authController.authenticateUser);

router.get('/register', (req, res, next) =>{
	res.send("It works");
});

module.exports = router;