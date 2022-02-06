'use strict';

require('dotenv').config();

const developmentEnviroNment = process.env.NODE_ENV || 'development';
const isProduction = developmentEnviroNment === 'production';

const developmentUri = process.env.DEVELOPMENT_MONGODB_URI || 'mongodb://127.0.0.1:27017/SundarClinic';
const productionUri = process.env.PRODUCTION_MONGODB_URI;
const connectionUri = isProduction ? productionUri : developmentUri;

const apiKeys = (process.env.API_KEYS || "").split(" ");

module.exports = {
	port: process.env.PORT || 8000,
	apiKeys,
	isProduction,
	reactAppUrl: process.env.REACT_APP_URL,
	backendAppUrl: process.env.BACKEND_APP_URL,
	appId: process.env.MONGODB_APP_ID,
	expireDurations: {
		tokenExpireAt: 8.64e7,
		verificationExpireAt: 8.64e7 * 3,
		passwordResetExpireAt: 8.64e7 * 3,
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
