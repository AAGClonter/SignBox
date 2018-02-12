// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const Employee = require('./models/employee');

// Get our API routes
const api = require('./server/routes/api');
const signinBox = require('./server/box');
const userRouter = require('./server/user');
const invRouter = require('./server/inventory');

const app = express();

// mongodb connection 
mongoose.connect("localhost:27017/signboxesdb");
var db = mongoose.connection;

// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Morgan
app.use(morgan('dev'));
// Point static path to dist
//app.use(express.static(path.join(__dirname, 'dist')));

app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	if(req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PATCH,PUT,POST,DELETE");
		return res.status(200).json({});
	}
	next();
});

// Set our api routes
app.use('/', api);
app.use('/', signinBox);
app.use('/', userRouter);
app.use('/inventory', invRouter);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));