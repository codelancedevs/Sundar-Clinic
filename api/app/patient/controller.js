'use strict';

const Patient = require('./model');
const { isEmail, isStrongPassword } = require('validator');
const {
	expireDurations: { tokenExpireAt },
} = require('../../helper/config');

/* ================================
	UNAUTHENTICATED CONTROLLERS
================================ */

/**
 * @description Create a new Patient
 * @route POST /api/patient/create
 * @data {fullName, email, password, tosAgreement: 'Boolean'}: 'String' in Request body
 * @access Patient
 * ! To be Tested
 */
exports.createPatient = async (req, res) => {
	// Collecting Required Data from Request Body
	const { fullName, email, password, tosAgreement } = req.body;
	try {
		// Pre Checks
		if (!fullName || !email || !password)
			throw new Error(
				"{fullName, email, password, tosAgreement: 'Boolean'} ; 'String' are required in the Request Body"
			);
		if (typeof fullName !== 'string')
			throw new Error('{fullName} should be a string');
		if (typeof email !== 'string')
			throw new Error('{email} should be a string');
		if (typeof password !== 'string')
			throw new Error('{password} should be a string');
		if (typeof tosAgreement !== 'boolean')
			throw new Error('{tosAgreement} should be a boolean');
		if (!isEmail(email)) throw new Error('Given Email is not valid');
		if (!isStrongPassword(password))
			throw new Error('Password is not strong enough');
		if (!tosAgreement)
			throw new Error(
				'Account Cannot be created without agreeing to Terms of Service'
			);

		// Creating New Patient
		const patient = new Patient({
			fullName,
			email,
			password,
			tosAgreement,
		});
		await patient.save();

		// Creating Patient Auth Token
		const patientToken = await patient.generateAuthToken();

		// Sending Patient Auth Token
		res.cookie('patientToken', patientToken, {
			httpOnly: true,
			signed: true,
			maxAge: tokenExpireAt,
		});

		// Response after successful creation with patient details
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

/**
 * @description <Controller description here>
 * @route METHOD <Route>
 * @data <Data either in body, params, or query>
 * @access <Access Level>
 * ! To be Tested
 */
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

/* ================================
	AUTHENTICATED CONTROLLERS
================================ */

/**
 * @description <Controller description here>
 * @route METHOD <Route>
 * @data <Data either in body, params, or query>
 * @access <Access Level>
 * ! To be Tested
 */
exports.fetchPatientProfile = async (req, res) => {};

/**
 * @description <Controller description here>
 * @route METHOD <Route>
 * @data <Data either in body, params, or query>
 * @access <Access Level>
 * ! To be Tested
 */
exports.editPatientDetails = async (req, res) => {};

/**
* @description <Controller description here>
* @route METHOD <Route>
* @data <Data either in body, params, or query>
* @access <Access Level>
* ! To be Tested
*/
exports.editPatientPassword = async (req, res) => {};

/**
* @description <Controller description here>
* @route METHOD <Route>
* @data <Data either in body, params, or query>
* @access <Access Level>
* ! To be Tested
*/
exports.deletePatientAccount = async (req, res) => {};

/**
* @description <Controller description here>
* @route METHOD <Route>
* @data <Data either in body, params, or query>
* @access <Access Level>
* ! To be Tested
*/
exports.logoutPatient = async (req, res) => {};
