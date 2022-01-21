'use strict';

// Importing Packages
const jwt = require('jsonwebtoken');
const Admin = require('../../app/admin/model');
const Patient = require('../../app/patient/model');
const {
	secrets: { adminSecret, patientSecret },
} = require('../config');

exports.authAdmin = async (req, res, next) => {
	const token = req.signedCookies.adminToken;
	try {
		if (!token) throw new Error('Not Authorized');
		const decoded = jwt.verify(token, adminSecret);
		const admin = await Admin.findById(decoded._id);
		if (!admin) throw new Error('Unable to find Admin');
		req.admin = admin.toObject();
		next();
	} catch (error) {
		console.log(error);
		return res
			.status(401)
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
		req.patient = patient.toObject;
		next();
	} catch (error) {
		console.log(error);
		return res
			.status(401)
			.json({ message: error.message, data: {}, success: false });
	}
};
