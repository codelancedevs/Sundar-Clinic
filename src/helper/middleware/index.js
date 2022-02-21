/**
 * Application Middleware
 */

'use strict';

// Dependencies
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../../api/admin/model');
const Patient = require('../../api/patient/model');
const errorHandler = require('./error');
const {
	secrets: {
		adminSecret,
		patientSecret,
		superAdminPassword,
	},
	apiKeys,
} = require('../config');

// Middleware Container
const middleware = {};

middleware.generalAuth = async (req, res, next) => {
	// Collecting Tokens from Request Cookies
	const { adminToken, patientToken } = req.signedCookies;
	try {
		if (!adminToken && !patientToken) throw new Error('Not Authorized');
		else if (adminToken && !patientToken) {
			const decoded = jwt.verify(adminToken, adminSecret);
			const admin = await Admin.findById(decoded._id);
			if (!admin) throw new Error('Unable to find Admin');
			req.user = {
				type: 'Admin',
				user: admin.toObject(),
			};
			return next();
		} else if (!adminToken && patientToken) {
			const decoded = jwt.verify(patientToken, patientSecret);
			const patient = await Patient.findById(decoded._id);
			if (!patient) throw new Error('Unable to find Patient');
			req.user = {
				type: 'Patient',
				user: patient.toObject(),
			};
			return next();
		} else {
			throw new Error(
				'You need to be logged in as Admin or Patient, not both!'
			);
		}
	} catch (error) {
		console.log(error);
		return res
			.status(401)
			.clearCookie('adminToken')
			.clearCookie('patientToken')
			.json({ message: error.message, data: {}, success: false });
	}
};

// Authorize Admins
middleware.authAdmin = async (req, res, next) => {
	// Collecting Tokens from Request Cookies
	const token = req.signedCookies.adminToken;
	try {
		if (!token) throw new Error('Not Authorized');
		const decoded = jwt.verify(token, adminSecret);
		const admin = await Admin.findById(decoded._id);
		if (!admin) throw new Error('Unable to find Admin');
		req.admin = admin;
		return next();
	} catch (error) {
		console.log(error);
		return res
			.status(401)
			.clearCookie('adminToken')
			.json({ message: error.message, data: {}, success: false });
	}
};

// Authorize Patients
middleware.authPatient = async (req, res, next) => {
	// Collecting Tokens from Request Cookies
	const token = req.signedCookies.patientToken;
	try {
		if (!token) throw new Error('Not Authorized');
		const decoded = jwt.verify(token, patientSecret);
		const patient = await Patient.findById(decoded._id);
		if (!patient) throw new Error('Unable to find Patient');
		req.patient = patient.toObject();
		return next();
	} catch (error) {
		console.log(error);
		return res
			.status(401)
			.clearCookie('patientToken')
			.json({ message: error.message, data: {}, success: false });
	}
};

// Authorize Super Admins
middleware.authSuperAdmin = async (req, res, next) => {
	let { superPassword } = req.body;
	try {
		superPassword =
			typeof superPassword === 'string' ? superPassword : false;
		if (!superPassword)
			throw new Error(
				"Super admin Password is required as {superPassword: 'String'}"
			);
		const isSuperAdmin = await bcrypt.compare(
			superPassword,
			superAdminPassword
		);
		if (!isSuperAdmin) throw new Error('Super Admin Password is Incorrect');
		req.superAdminAuthenticated = isSuperAdmin;
		return next();
	} catch (error) {
		console.log(error);
		return res
			.status(401)
			.json({ message: error.message, data: {}, success: false });
	}
};

// Authorize API Related Requests
middleware.authApiKey = (req, res, next) => {
	const providedKey = req.headers['x-api-key'];
	const isFromSDK = req.headers['x-sdk-req'] === 'SDK-SS';
	try {
		if (!isFromSDK) return next(); // If it's not sdk related, then proceed
		if (isFromSDK && !providedKey) throw new Error('API Is Required!'); // If from sdk, then check if api key is provided
		const isValidApiKey = apiKeys.includes(providedKey); // Check Api key validity
		if (!isValidApiKey) throw new Error('Unauthorized API Key');
		return next();
	} catch (error) {
		console.log(error);
		return res
			.status(401)
			.json({ message: error.message, data: {}, success: false });
	}
};

// Prevent Cross Site Trace and track attacks.
middleware.preventXST = (req, res, next) => {
	// NOTE: Exclude TRACE and TRACK methods to avoid XST attacks.
	const allowedMethods = [
		'OPTIONS',
		'HEAD',
		'CONNECT',
		'GET',
		'POST',
		'PUT',
		'DELETE',
		'PATCH',
	];

	if (!allowedMethods.includes(req.method)) {
		return res.status(405).send(`${req.method} not allowed.`);
	}

	return next();
};

middleware.errorHandler = errorHandler;

module.exports = middleware;