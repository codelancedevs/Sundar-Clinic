/**
 * Server Entry Application
 */

'use strict';

// Dependencies
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
	loggingOptions,
	backendAppUrl,
} = require('./src/helper/config');
const { preventXST } = require('./src/helper/middleware');

// Importing App Router
const appRouter = require('./src/api/app');

// Initializing Express Application
const app = express();

// Using Middleware
app.use(express.json());
app.use(preventXST);
app.use(
	cors({
		origin: reactAppUrl,
		optionsSuccessStatus: 200,
		credentials: true,
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(cookieSecret));
app.use(logger(loggingOptions));
app.set("views", path.join(__dirname, "views")); 
app.set("view engine", "ejs"); 

app.disable('x-powered-by');

// Connecting App to MongoDB
require('./src/helper/database');

// Using App Router
app.use(appRouter);

// Handling 404 Error
app.use((req, res, next) => {
	const error = new Error(
		`Can't find Request: '${req.originalUrl}' on the server! ❌`
	);
	error.status = 404;
	return next(error);
});

// Handling Server Error
app.use((error, req, res, next) => {
	console.log(error.stack);
	const status = error.status || 500;
	const message = error.message || 'Internal Server Error! 🚫';
	return res.status(status).json({ error: { message }, success: false });
});

// Run Server
app.listen(port, () => {
	console.log(
		`Server Running at ${isProduction ? backendAppUrl : `http://localhost:${port}`
		}`
	);
});
