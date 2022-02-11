/**
 * Application Middleware
 */

'use strict';

// Dependencies
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../../app/admin/model');
const Patient = require('../../app/patient/model');
const {
	secrets: {
		adminSecret,
		patientSecret,
		superAdminSecret,
		superAdminPassword,
	},
	apiKeys,
} = require('../config');

// Authorize Admins
exports.authAdmin = async (req, res, next) => {
	const token = req.signedCookies.adminToken;
	try {
		if (!token) throw new Error('Not Authorized');
		const decoded = jwt.verify(token, adminSecret);
		const admin = await Admin.findById(decoded._id);
		if (!admin) throw new Error('Unable to find Admin');
		req.admin = admin.toObject();
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
exports.authPatient = async (req, res, next) => {
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
exports.authSuperAdmin = async (req, res, next) => {
	const { superPassword } = req.body;
	try {
		if (!superPassword)
			throw new Error(
				"Super admin Password is required as {superPassword: 'String'}"
			);
		if (typeof superPassword !== 'string')
			throw new Error(
				`superPassword should be a string, cannot be ${typeof superPassword}`
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
exports.authApiKey = (req, res, next) => {
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
exports.preventXST = (req, res, next) => {
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
		res.status(405).send(`${req.method} not allowed.`);
	}

	return next();
};

exports.errorHandler = (err, req, res, next) => {};
