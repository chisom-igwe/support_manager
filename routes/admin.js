const express = require('express');
const router = express.Router();

router.get('/register', (req, res, next) =>{
	res.send("ADMIN REGISTER");
});

router.get('/login', (req, res, next) =>{
	res.send("ADMIN Login");
});

router.get('/dashboard', (req, res, next) =>{
	res.send("ADMIN dashboard");
});


module.exports = router; 