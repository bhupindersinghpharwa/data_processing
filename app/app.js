const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('../config');
const http = require('http');
const cors = require('cors');

const app = express();

/** Set configurations */
app.config = config

// /** Enable CORS */
const enableCORS = function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Access-Control-Allow-Origin');
	next();
};
app.use(enableCORS);

const corsOpts = {
	origin: '*',

	methods: [
		'GET',
		'POST',
	],

	allowedHeaders: [
		'Content-Type',
	],
};

app.use(cors(corsOpts));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({ extended: false })); 

/** Mount routes */
app.use(require('./routes'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

/** Create http server */
app.server = http.createServer()
app.listen(app.config.port, () => {
	console.log(`Server listening on ${app.config.host}:${app.config.port}`)
});

module.exports = app;
