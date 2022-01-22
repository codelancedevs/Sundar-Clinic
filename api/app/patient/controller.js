'use strict';

const Patient = require('./model');

/* ================================
    UNAUTHENTICATED CONTROLLERS
================================ */

exports.createPatient = async (req, res) => {
	try {
		// TODO: Error Handling here
		const patient = new Patient(req.body);
		await patient.save();
		return res.status(201).json({
			message: 'Patient Account Created Successfully',
			data: {
				patient: patient.sanitizeAndReturnUser(),
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

exports.loginPatient = async (req, res) => {
	const { email, password } = req.body;
	try {
		// TODO: Error handling here
		const patient = await Patient.findOne({ email });
		if (!patient) throw new Error('No Patient account found');
		const validated = await patient.authenticatePassword({ password });
		if (!validated) throw new Error('Wrong Password');
		return res.status(200).json({
			message: 'Login Successful',
			data: {
				patient: patient.sanitizeAndReturnUser(),
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

exports.verifyPatient = (req, res) => {};

/* ================================
    AUTHENTICATED CONTROLLERS
================================ */

exports.fetchPatientProfile = async (req, res) => {};

exports.savePatientDetails = async (req, res) => {};
