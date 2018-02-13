//import modules 
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mysql = require('mysql');
const config = require('./config/database'); 

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