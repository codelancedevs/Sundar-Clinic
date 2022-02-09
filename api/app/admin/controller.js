/**
 * Admin Controllers
 */

'use strict';

// Dependencies
const { isEmail, isStrongPassword } = require('validator');
const Admin = require('./model');
const Patient = require('../patient/model');
const {
	expireDurations: { tokenExpireAt },
} = require('../../helper/config');

/* ================================
	UNAUTHENTICATED CONTROLLERS
================================ */

/**
 * @description Login Admin with Credentials
 * @route POST /api/admin/login
 * @data {email, password} : 'String' in Request Body
 * @access Public
 */
exports.loginAdmin = async (req, res) => {
	// Collecting Required Data from Request Data
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

		// Finding Admin From Database
		const admin = await Admin.findOne({ email });
		if (!admin) throw new Error('No Admin account found');

		// Authenticating Admin Password
		const validated = await admin.authenticatePassword({ password });
		if (!validated) throw new Error('Wrong Password');

		// Creating Admin Auth Token
		const adminToken = await admin.generateAuthToken();

		// Sending Admin Auth Token
		res.cookie('adminToken', adminToken, {
			httpOnly: true,
			signed: true,
			maxAge: tokenExpireAt,
		});

		// Responding with admin details
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

// ADMIN RELATED

/**
 * @description Create New Admin
 * @route POST /api/admin/create
 * @data {fullName, email, password, tosAgreement: 'Boolean'}: 'String' in Request body
 * @data {superPassword}: 'String' in Request Body
 * @access Super Admin
 */
exports.createAdmin = async (req, res) => {
	// Collecting Required Data from Request Body and Middleware
	let { fullName, email, password, tosAgreement } = req.body;
	const isSuperAdminAuthenticated = req.superAdminAuthenticated;
	try {
		// Type Check
		if (!isSuperAdminAuthenticated)
			throw new Error('Requires Super Admin Auth');
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

		// Creating New Admin
		const admin = new Admin({ fullName, email, password, tosAgreement });
		await admin.save();

		// Creating Admin Auth Token
		const adminToken = await admin.generateAuthToken();

		// Sending Admin Auth Token
		res.cookie('adminToken', adminToken, {
			httpOnly: true,
			signed: true,
			maxAge: tokenExpireAt,
		});

		// Response after successful creation with admin details
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

/**
 * @description <Controller description here>
 * @route METHOD <Route>
 * @data <Data either in body, params, or query>
 * @access <Access Level>
 * ! To be Tested
 */
exports.adminEmailAvailable = async (req, res) => {};

/**
 * @description <Controller description here>
 * @route METHOD <Route>
 * @data <Data either in body, params, or query>
 * @access <Access Level>
 * ! To be Tested
 */
exports.adminUsernameAvailable = async (req, res) => {};

/**
 * @description Edit Admin Account Details
 * @route PATCH /api/admin/details
 * @data {fullName, username, email, phone, address}: 'String' in Request Body
 * @access Admin
 */
exports.editAdminDetails = async (req, res) => {
	// Collecting Required Data from Request Body and Middleware
	const { _id } = req.admin;
	let { fullName, username, email, phone, address } = req.body;
	try {
		// Finding Admin
		const admin = await Admin.findById(_id);
		if (!admin) throw new Error('Unable to find admin');

		// Updating admin details
		// If details are not given, then existing details are passed back
		const details = {
			fullName: fullName || admin.fullName,
			username: username || admin.username,
			email: email || admin.email,
			phone: phone || admin.phone,
			address: address || admin.address,
		};
		await admin.updateOne({ ...details });

		// Response after all updating all admin details
		return res.status(200).json({
			message: 'Details Updated Successfully',
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
 * @description Edit Admin Password to a new one
 * @route PATCH /api/admin/password
 * @data {password, newPassword}: 'String' in Request Body
 * @access Admin
 */
exports.editAdminPassword = async (req, res) => {
	// Collecting Required Data from Request Body and Middleware
	const { _id } = req.admin;
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

		// Finding Admin Account
		const admin = await Admin.findById(_id);
		if (!admin) throw new Error('Unable to find admin');

		// Validate Password
		const validated = await admin.authenticatePassword({ password });
		if (!validated) throw new Error('Wrong Password');

		// Check if old password is the same as new Password
		const isSamePassword = await admin.authenticatePassword({
			password: newPassword,
		});
		if (isSamePassword)
			throw new Error('Old Password and New Password cannot be same');

		// Generate New Password
		const hashedPassword = await admin.returnHashedPassword({
			password: newPassword,
		});

		// Update Password for Admin
		await admin.updateOne({ password: hashedPassword });

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
 * @description Delete Admin Account
 * @route DELETE /api/admin/delete
 * @data {password}: 'String' in Request Body
 * @access Admin
 */
exports.deleteAdminAccount = async (req, res) => {
	// Collecting Required Data from Request Body and Middleware
	const { _id } = req.admin;
	let { password } = req.body;
	try {
		// Admin Check
		const admin = await Admin.findById(_id);
		if (!admin) throw new Error('Unable to find admin');

		// Password Check
		password = typeof password === 'string' ? password : false;
		if (!password)
			throw new Error(
				"{password} : 'String' should be there in Request Body."
			);

		// Validate Password
		const validated = await admin.authenticatePassword({ password });
		if (!validated) throw new Error('Wrong Password');

		// Delete Admin Account
		await admin.delete();

		// Sending Response upon successful deletion of admin account
		// Clearing Cookie (Essentially Logout Admin)
		res.clearCookie('adminToken');
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

/**
 * @description Logout Admin by Clearing token
 * @route POST /api/admin/logout
 * @data No data to be passed
 * @access Admin
 */
exports.logoutAdmin = async (req, res) => {
	// Collecting Required Data from Middleware
	const { _id } = req.admin;
	try {
		// Admin Check
		const admin = await Admin.findById(_id);
		if (!admin) throw new Error('Unable to find admin');

		// Respond with Logout
		res.clearCookie('adminToken');
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

// PATIENT RELATED

/**
 * @description Admin can create a new Patient
 * @route POST /api/admin/patient-create
 * @data {fullName, email, tosAgreement: 'Boolean'}: 'String' in Request body
 * @access Admin
 * ? Add Feature to Email the Password to Patient after successful acount creation
 */
exports.createNewPatient = async (req, res) => {
	// Collecting Required Data from Request Body
	let { fullName, email, tosAgreement } = req.body;
	try {
		// Type Check
		fullName = typeof fullName === 'string' ? fullName : false;
		email = typeof email === 'string' ? email : false;
		tosAgreement = typeof tosAgreement === 'boolean' ? tosAgreement : false;
		if (!fullName || !email) {
			throw new Error(
				"{fullName, email} : 'String' and {tosAgreement} : 'Boolean' are required in Request Body"
			);
		}
		// Details Check
		if (!isEmail(email)) throw new Error('{email} should be valid!');
		if (!tosAgreement) {
			throw new Error(
				'Cannot create account without agreeing to Terms of Service'
			);
		}

		// Creating New Patient
		const password = Patient.createRandomPassword({ fullName });
		const patientDetails = {
			fullName,
			email,
			password,
			tosAgreement,
		};
		const patient = await Patient({ ...patientDetails });
		await patient.save();

		patientDetails._id = patient._id;
		// Response Upon Successful creation of patient by admin
		// Sending Password to share with Patient
		// ? Can Later be implemented to send the password directly to Patient as well
		return res.status(200).json({
			message: 'Patient Created Successfully',
			data: {
				patient: patientDetails,
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
 * @description Get all Patients
 * @route GET /api/admin/patient?_id=<patient id>&searchByFullName=<patient name>
 * @data No data required for all patients or specify {_id} in Request Query for specific user, search patients if {searchByFullName} is present Request Query
 * @access Admin
 */
exports.fetchPatients = async (req, res) => {
	// Collecting Required Data from Request Query
	let { _id, searchByFullName } = req.query;
	try {
		// Checking Request Type
		_id = typeof _id === 'string' ? _id : false;
		searchByFullName =
			typeof searchByFullName === 'string' ? searchByFullName : false;

		// Patients Container
		const patients = [];

		if (searchByFullName) {
			const searchedPatients = await Patient.find({
				fullName: { $regex: searchByFullName, $options: 'i' },
			});
			patients.push(...searchedPatients);
		} else {
			if (_id) {
				const patient = await Patient.findById(_id);
				if (!patient) throw new Error('Unable to find Patient');
				patients.push(patient.sanitizeAndReturnUser());
			} else {
				// Getting all patients
				const allPatients = await Patient.getAllPatients();
				patients.push(...allPatients);
			}
		}

		// Response with all Patients
		return res.status(200).json({
			message: 'Successful response message',
			data: { patients },
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
 * @description Admin can edit Patient History
 * @route POST /api/admin/patient-history
 * @data {historyFor: 'String', _id: 'String', details: 'Object'} in the Request Body
 * @access Admin
 */
exports.editPatientHistory = async (req, res) => {
	// Collecting Required Data from Request Body
	const { _id, historyFor, details } = req.body;
	try {
		await Patient.updateHistoryDetails({
			historyFor,
			_id,
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
 * @description Admin Can delete a Patient
 * @route DELETE /api/admin/patient-delete
 * @data {_id} : 'String' Patient Id in the Request Body
 * @access Admin
 * ? Add Feature To Email Patient When Account is deleted
 */
exports.deletePatient = async (req, res) => {
	// Collecting Required Data from Request Body
	let { _id } = req.body;
	try {
		// Type Check
		_id = typeof _id === 'string' ? _id : false;
		if (!_id)
			throw new Error("{_id} : 'String' should be there in Request Body");

		// Delete Patient
		Patient.findByIdAndDelete(_id).exec((err, data) => {
			if (!err) throw new Error('Unable to find Patient');
		});

		// Response after successfully deleting patient account
		// ? Implement Feature to Email Patient that account has been deleted
		return res.status(200).json({
			message: 'Patient Account Deleted Successfully',
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
