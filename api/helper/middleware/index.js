'use strict';

// Importing Packages
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
} = require('../config');

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

exports.errorHandler = (err, req, res, next) => {};
