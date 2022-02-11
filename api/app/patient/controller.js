/**
 * Patient Controllers
 */

'use strict';

// Dependencies
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
 * @access Public
 */
exports.createPatient = async (req, res) => {
	// Collecting Required Data from Request Body
	let { fullName, email, password, tosAgreement } = req.body;
	try {
		// Type Checks
		fullName = typeof fullName === 'string' ? fullName : false;
		email = typeof email === 'string' ? email : false;
		password = typeof password === 'string' ? password : false;
		tosAgreement = typeof tosAgreement === 'boolean' ? tosAgreement : false;
		if (!fullName || !email || !password)
			throw new Error(
				"{fullName, email, password, tosAgreement: 'Boolean'} ; 'String' are required in the Request Body"
			);

		// Details Validity Check
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
 * @description Login into Patient Account
 * @route POST /api/patient/login
 * @data {email, password} : 'String' in Request Body
 * @access Public
 */
exports.loginPatient = async (req, res) => {
	// Collecting Required Data from Request Body
	let { email, password } = req.body;
	try {
		// Type Check
		email = typeof email === 'string' ? email : false;
		password = typeof password === 'string' ? password : false;
		if (!email || !password)
			throw new Error(
				"{email, password} : 'String' required in Request body"
			);

		// Details Validity Check
		if (!isEmail(email)) throw new Error('Given email is not valid');

		// Finding Patient From Database
		const patient = await Patient.findOne({ email });
		if (!patient) throw new Error('No Patient account found');

		// Validating Patient
		const validated = await patient.authenticatePassword({ password });
		if (!validated) throw new Error('Wrong Password');

		// Creating Patient Auth Token
		const patientToken = await patient.generateAuthToken();

		// Sending Patient Auth Token
		res.cookie('patientToken', patientToken, {
			httpOnly: true,
			signed: true,
			maxAge: tokenExpireAt,
		});

		// Response after successful validation
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
exports.patientEmailAvailable = async (req, res) => { };

/**
 * @description <Controller description here>
 * @route METHOD <Route>
 * @data <Data either in body, params, or query>
 * @access <Access Level>
 * ! To be Tested
 */
exports.patientUsernameAvailable = async (req, res) => { };

/**
 * @description Edit Patient Account Details
 * @route PATCH /api/patient/accountDetails
 * @data {fullName, username, email, phone, address}: 'String' in Request Body
 * @access Patient
 */
exports.editPatientAccountDetails = async (req, res) => {
	// Collecting Required Data from Request Body and Middleware
	const { _id } = req.patient;
	let { fullName, username, email, phone, address } = req.body;
	try {
		// Finding Patient
		const patient = await Patient.findById(_id);
		if (!patient) throw new Error('Unable to find patient');

		// Updating patient details
		// If details are not given, then existing details are passed back
		const details = {
			fullName: fullName || patient.fullName,
			username: username || patient.username,
			email: email || patient.email,
			phone: phone || patient.phone,
			address: address || patient.address,
		};
		await patient.updateOne({ ...details });

		// Response after all updating patient account details
		return res.status(200).json({
			message: 'Patient Account Details Updated Successfully',
			data: { ...details },
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
 * @description Edit Patient General Details
 * @route PATCH /api/patient/generalDetails
 * @data {dateOfBirth, gender} : 'String' {maritalStatus, kidsDetails} : 'Object' in the Request Body
 * @access Patient
 * ? Additional Discussion for Passing Date, Object Id's in maritalStatus and kidsDetails should be included until necessary
 */
exports.editPatientGeneralDetails = async (req, res) => {
	// Collecting Required data from Request Body and Middleware
	const { _id } = req.patient;
	let { dateOfBirth, gender, maritalStatus, kidsDetails } = req.body;
	try {
		// Finding Patient
		const patient = await Patient.findById(_id);
		if (!patient) throw new Error('Unable to find patient');

		// Updating patient details
		// If details are not given, then existing details are passed back
		const details = {
			dateOfBirth: dateOfBirth || patient.dateOfBirth,
			gender: gender || patient.gender,
			maritalStatus: maritalStatus || patient.maritalStatus,
			kidsDetails: kidsDetails || kidsDetails,
		};
		await patient.updateOne({ ...details });

		// Response after updating Patient General Details
		return res.status(200).json({
			message: 'Patient General Details Updated Successfully',
			data: { ...details },
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
 * @description Edit Patient Password to a new One
 * @route PATCH /api/patient/password
 * @data {password, newPassword}: 'String' in Request Body
 * @access Patient
 */
exports.editPatientPassword = async (req, res) => {
	// Collecting Required Data from Request Body and Middleware
	const { _id } = req.patient;
	let { password, newPassword } = req.body;
	try {
		// Pre Checks
		password = typeof password === 'string' ? password : false;
		newPassword = typeof newPassword === 'string' ? newPassword : false;
		if (!password || !newPassword) {
			throw new Error(
				"{password, newPassword} : 'String' is Required in Request Body"
			);
		}

		// Finding Patient Account
		const patient = await Patient.findById(_id);
		if (!patient) throw new Error('Unable to find patient');

		// Validate Password
		const validated = await patient.authenticatePassword({ password });
		if (!validated) throw new Error('Wrong Password');

		// Check if old password is the same as new Password
		const isSamePassword = await patient.authenticatePassword({
			password: newPassword,
		});
		if (isSamePassword)
			throw new Error('Old Password and New Password cannot be same');

		// Generate New Password
		const hashedPassword = await patient.returnHashedPassword({
			password: newPassword,
		});

		// Update Password for Patient
		await patient.updateOne({ password: hashedPassword });

		// Response after successfully updating password
		return res.status(200).json({
			message: 'Password Updated Successfully',
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

/**
 * @description Delete Patient Account
 * @route DELETE /api/patient/delete
 * @data {password: 'String'} in Request Body
 * @access Patient
 */
exports.deletePatientAccount = async (req, res) => {
	// Collecting Required Data from Request Body and Middleware
	const { _id } = req.patient;
	let { password } = req.body;
	try {
		// Patient Check
		const patient = await Patient.findById(_id);
		if (!patient) throw new Error('Unable to find patient');

		// Password Check
		password = typeof password === 'string' ? password : false;
		if (!password)
			throw new Error(
				"{password} : 'String' should be there in Request Body."
			);

		// Validate Password
		const validated = await patient.authenticatePassword({ password });
		if (!validated) throw new Error('Wrong Password');

		// Delete Patient Account
		await patient.delete();

		// Sending Response upon successful deletion of patient account
		// Clearing Cookie (Essentially Logout Patient)
		res.clearCookie('patientToken');
		return res.status(200).json({
			message: 'Patient Deleted Successfully',
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

/**
 * @description Logout Patient by Clearing token
 * @route POST /api/patient/logout
 * @data No date to be passed
 * @access Patient
 */
exports.logoutPatient = async (req, res) => {
	// Collecting Required Data from Middleware
	const { _id } = req.patient;
	try {
		// Patient Check
		const patient = await Patient.findById(_id);
		if (!patient) throw new Error('Unable to find patient');

		// Respond with Logout
		res.clearCookie('patientToken');
		return res.status(200).json({
			message: 'Logged Out Successfully',
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

// Patient Main Features

/**
 * @description Update Patient History
 * @route POST /api/patient/history
 * @data {historyFor: 'String', details: 'Object'} in the Request Body
 * @access Patient
 */
exports.updateHistoryDetails = async (req, res) => {
	// Collecting Required data from Request Body and Middleware
	const { _id } = req.patient;
	const { historyFor, details } = req.body;
	try {
		await Patient.updateHistoryDetails({
			historyFor,
			_id: _id.toString(),
			details,
		});

		// Response Upon Successful History Update
		return res.status(200).json({
			message: `History for ${historyFor} Updated Successfully`,
			data: { ...details },
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
 * @description Update Patient's Presenting Complaint
 * @route POST /api/patient/presentingComplaint
 * @data {complaint, duration} : String in the Request Body
 * @access Patient
 */
exports.updatePresentingComplaint = async (req, res) => {
	// Collecting Required data from Request Body and Middleware
	const { _id } = req.patient;
	let { complaint, duration } = req.body;
	try {
		// Type Checks
		complaint = typeof complaint === 'string' ? complaint : false;
		duration = typeof duration === 'string' ? duration : false;
		if (!complaint || !duration) {
			throw new Error(
				"{complaint, duration} : 'String' should be there in the Request Body"
			);
		}

		// Add Presenting Complaint with Current Date
		const details = {
			date: Date.now(),
			complaint,
			duration,
		};
		await Patient.updateOne(
			{ _id },
			{
				$push: { presentingComplaint: { ...details } },
			}
		);

		// Response after updating Presenting Complaint
		return res.status(200).json({
			message: 'Patient Presenting Complaint Recorded Successfully',
			data: { ...details },
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({ message: error.message, data: {}, success: false });
	}
};
