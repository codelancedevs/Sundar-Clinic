'use strict';

const Admin = require('./model');
const Patient = require('../patient/model');
const { isEmail, isStrongPassword } = require('validator');

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
	const { email, password } = req.body;
	try {
		// Pre Checks
		if (!email || !password)
			throw new Error(
				"{email, password} : 'String' required in Request body"
			);
		if (!isEmail(email)) throw new Error('Given email is not valid');

		// Finding Admin From Database
		const admin = await Admin.findOne({ email });
		if (!admin) throw new Error('No Admin account found');

		// Authenticating Admin Password
		const validated = await admin.authenticatePassword({ password });
		if (!validated) throw new Error('Wrong Password');

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

/**
 * @description Authenticate Admin Account from the Link clicked by email
 * @route PATCH
 * @data <Data either in body, params, or query> 
 * ? Data to be implemented
 * @access Public
 * ! To be Tested
 */
exports.verifyAdmin = (req, res) => {};

/* ================================
    AUTHENTICATED CONTROLLERS
================================ */

/**
 * @description Create New Admin
 * @route POST /api/admin/create
 * @data {fullName, email, password, tosAgreement: 'Boolean'}: 'String' in Request body
 * @data {superPassword}: 'String' in Request Body
 * @access Super Admin
 */
exports.createAdmin = async (req, res) => {
	const { fullName, email, password, tosAgreement } = req.body;
	const isSuperAdminAuthenticated = req.superAdminAuthenticated;
	try {
		// Pre Checks
		if (!isSuperAdminAuthenticated)
			throw new Error('Requires Super Admin Auth');
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

		// Creating New Admin
		const admin = new Admin({ fullName, email, password, tosAgreement });
		await admin.save();

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
 * ! To be tested
 */
exports.editAdminDetails = async (req, res) => {};

/**
 * @description Delete Admin Account
 * @route METHOD DELETE
 * @data {password}: 'String' in Request Body
 * @access Admin
 * ! To be tested
 */
exports.deleteAdminAccount = async (req, res) => {
	const { _id } = req.admin;
	const { password } = req.body;
	try {
		// TODO: Error handling here
		const admin = await Admin.findById(_id);
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

/**
 * @description <Controller description here>
 * @route METHOD <Route>
 * @data <Data either in body, params, or query>
 * @access <Access Level>
 * ! To be Tested
 */
exports.fetchAllPatients = async (req, res) => {};

/**
 * @description <Controller description here>
 * @route METHOD <Route>
 * @data <Data either in body, params, or query>
 * @access <Access Level>
 * ! To be Tested
 */
exports.fetchPatient = async (req, res) => {};

/**
 * @description <Controller description here>
 * @route METHOD <Route>
 * @data <Data either in body, params, or query>
 * @access <Access Level>
 * ! To be Tested
 */
exports.deletePatient = async (req, res) => {};

/**
 * @description <Controller description here>
 * @route METHOD <Route>
 * @data <Data either in body, params, or query>
 * @access <Access Level>
 * ! To be Tested
 */
exports.searchPatients = async (req, res) => {};
