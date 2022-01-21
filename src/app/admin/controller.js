'use strict';

const Admin = require('./model');
const Patient = require('../patient/model');

/* ================================
    UNAUTHENTICATED CONTROLLERS
================================ */

exports.createAdmin = async (req, res) => {
	try {
		// TODO: Error Handling here
		const admin = new Admin(req.body);
		await admin.save();
		return res.status(201).json({
			message: 'Admin Account Created Successfully',
			data: {
				admin: admin.sanitizeAndReturnUser(),
			},
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({ message: error.message, data: {}, success: false });
	}
};

exports.loginAdmin = async (req, res) => {
	const { email, password } = req.body;
	try {
		// TODO: Error handling here
		const admin = await Admin.findOne({ email });
		if (!admin) throw new Error('No Admin account found');
		const validated = await admin.authenticatePassword({ password });
		if (!validated) throw new Error('Wrong Password');
		return res.status(200).json({
			message: 'Login Successful',
			data: {
				admin: admin.sanitizeAndReturnUser(),
			},
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({ message: error.message, data: {}, success: false });
	}
};

/* ================================
    AUTHENTICATED CONTROLLERS
================================ */

exports.editAdminDetails = async (req, res) => {};

exports.deleteAdminAccount = async (req, res) => {
	const { _admin } = req.admin;
	const { password } = req.body;
	try {
		// TODO: Error handling here
		const admin = await Admin.findById(_admin._id);
		if (!admin) throw new Error('Unable to find admin');
		const validated = admin.authenticatePassword({ password });
		if (!validated) throw new Error('Wrong Password');
		await admin.delete();
		return res.status(200).json({
			message: 'Admin Deleted Successfully',
			data: {},
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({ message: error.message, data: {}, success: false });
	}
};

exports.createNewPatient = async (req, res) => {};

exports.fetchAllPatients = async (req, res) => {};

exports.fetchPatient = async (req, res) => {};

exports.deletePatient = async (req, res) => {};

exports.searchPatients = async (req, res) => {};
