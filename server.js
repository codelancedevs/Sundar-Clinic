'use strict';

// Importing Packages
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const {
	port,
	secrets: { cookieSecret },
	reactAppUrl,
	isProduction,
} = require('./api/helper/config');

// Importing App Router
const appRouter = require('./api/app/src');

// Initializing Express Application
const app = express();

// Using Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(cookieSecret));
app.use(logger(isProduction ? 'combined' : 'dev'));
app.use(
	cors({
		origin: isProduction ? reactAppUrl : `http://localhost:${port}`,
		optionsSuccessStatus: 200,
	})
);

// Connecting to MongoDB
require('./api/helper/database');

// Using App Router
app.use(appRouter);

// Handling 404 Error
app.use((req, res, next) => {
	const error = new Error(
		`Can't find Request: '${req.originalUrl}' on the server! ❌`
	);
	error.status = 404;
	next(error);
});

// Handling Server Error
app.use((error, req, res, next) => {
	console.log(error.stack);
	const status = error.status || 500;
	const message = error.message || 'Internal Server Error! 🚫';
	res.status(status).json({ error: { message }, success: false });
});

// Run Server
app.listen(port, () => {
	console.log(`Server Running at http://localhost:${port}`);
});
