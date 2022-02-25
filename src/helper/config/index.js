/**
 * App Configuration
 */

'use strict';

// Dependencies
require('dotenv').config();

// Node Environment
const developmentEnviroNment = process.env.NODE_ENV || 'development';
const isProduction = developmentEnviroNment === 'production';

// Database Connections
const developmentUri =
	process.env.DEVELOPMENT_MONGODB_URI ||
	'mongodb://127.0.0.1:27017/SundarClinic';
const productionUri = process.env.PRODUCTION_MONGODB_URI;
const connectionUri = isProduction ? productionUri : developmentUri;

// API Keys
const apiKeys = (process.env.API_KEYS || '').split(' ');

// React App Connection
const reactAppUrl = isProduction
	? process.env.REACT_APP_URL || 'http://localhost:3000'
	: 'http://localhost:3000';

// Logging Options
const loggingOptions = isProduction ? 'combined' : 'dev';

// Configuration Container
const configuration = {
	port: process.env.PORT || 8000,
	apiKeys,
	isProduction,
	reactAppUrl,
	loggingOptions,
	backendAppUrl: process.env.BACKEND_APP_URL || `http://localhost:${port}`,
	appId: process.env.MONGODB_APP_ID,
	sendGridApiKey: process.env.SENDGRID_API_KEY,
	expireDurations: {
		tokenExpireAt: 8.64e7 * 30, // 30 Days
		verificationExpireAt: 8.64e7 * 7, // 7 Days
		passwordResetExpireAt: 8.64e7 * 3, // 3 Days
	},
	mongoDb: {
		connectionUri,
	},
	secrets: {
		adminSecret: process.env.ADMIN_SECRET,
		patientSecret: process.env.PATIENT_SECRET,
		verificationSecret: process.env.VERIFICATION_SECRET,
		passwordResetSecret: process.env.PASSWORD_RESET_SECRET,
		deleteAccountSecret: process.env.DELETE_ACCOUNT_SECRET,
		cookieSecret: process.env.COOKIE_SECRET,
		superAdminPassword: process.env.SUPER_ADMIN_PASSWORD,
		superAdminSecret: process.env.SUPER_ADMIN_SECRET,
		saltRounds: parseInt(process.env.SALT_ROUNDS, 10) || 8,
	},
	mail: {
		email: process.env.MAIL_EMAIL,
		password: process.env.MAIL_PASSWORD,
	},
};

// Exporting Configuration
module.exports = configuration;
