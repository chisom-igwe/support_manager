const express = require('express'); 
const router = express.Router(); 

const config = require('../config'); 
const allowOnly = require('../services/routesHelper').allowOnly,
const authController = require('../controllers/authController'),

router.post('/register', authController.signUp);

router.post('/authenticate', authController.authenticateUser);

router.get('/dashboard', (req, res, next) =>{
	res.send("dashboard");
});

module.exports = router;