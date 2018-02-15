//import modules 
const bodyParser = require('body-parser');
const config = require('./config');
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken'); 
const mysql = require('mysql');
const passport = require('passport');
const path = require('path');
const sequelize = require('sequelize');
const morgan = require('morgan'); 
const hookJwtStrategy = require('./services/passportStrategy');

//create application 
const app = express(); 


//connect databse 
var connection = mysql.createConnection(config.db);

connection.connect(function(err){
	if (err)
		return console.log("Error connecting to database: " + err); 
	console.log("Connected");
});

	

// Parse as urlencoded and json.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Hook up the HTTP logger.
app.use(morgan('dev'));

hookJwtStrategy(passport);


// Hook up Passport.
app.use(passport.initialize());


//set static folder
app.use(express.static(path.join(__dirname,'public')));


//bundle routes 
app.use('/users', require('./routes/users')(passport));


app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/app/views/index.html'));
});

const port = 3000; 

//listen on port 
app.listen(port, () =>{
	console.log(`Server is listening on port ${port}`);
});