const express = require('express'); 
const router = express.Router(); 


router.post('/register', (req, res, next) =>{
	res.send("REGISTER");
});

router.get('/login', (req, res, next) =>{
	res.send("Login");
});

router.get('/dashboard', (req, res, next) =>{
	res.send("dashboard");
});

module.exports = router;