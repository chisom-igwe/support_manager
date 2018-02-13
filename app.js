//import modules 
const bodyParser = require('body-parser');
const config = require('./config/config');
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken'); 
const mysql = require('mysql');
const passport = require('passport');
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


//get routes
const users = require('./routes/users'); 
const admin = require('./routes/admin'); 


// Parse as urlencoded and json.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Hook up the HTTP logger.
app.use(morgan('dev'));

// Hook up Passport.
app.use(passport.initialize());

hookJwtStrategy(passport);

//set static folder
app.use(express.static(path.join(__dirname,'public')));

// Cors Middleware 
app.use(cors());


//Body Parser Middleware
app.use(bodyParser.json()); 

app.use('/users', users);
app.use('/admin', admin);


//index route 
app.get('/', (req, res) =>{
	// connection.getConnection(function(error, users){
	// 	if(!!error){
	// 		users.release(); 
	// 		console.log('Error');
	// 	}
	// })
	res.send('Invalid Endpoint');
}); 

const port = 3000; 

//listen on port 
app.listen(port, () =>{
	console.log(`Server is listening on port ${port}`);
});