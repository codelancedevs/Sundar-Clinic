'use strict';

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
		const adminToken = await admin.generateAuthToken();
		res.cookie('adminToken', adminToken, {
			httpOnly: true,
			signed: true,
			maxAge: tokenExpireAt,
		});
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
		const adminToken = await admin.generateAuthToken();
		res.cookie('adminToken', adminToken, {
			httpOnly: true,
			signed: true,
			maxAge: tokenExpireAt,
		});
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
 * @description Edit Admin Account Details
 * @route PATCH /api/admin/details
 * @data {fullName, username, email, phone, address}: 'String' in Request Body
 * @access Admin
 * ! To be tested
 */
exports.editAdminDetails = async (req, res) => {
	const { _id } = req.admin;
	const { fullName, username, email, phone, address } = req.body;
	try {
		// TODO: Request body error handling here
		const admin = await Admin.findById(_id);
		if (!admin) throw new Error('Unable to find admin');

		// Updating Admin
		const details = {
			fullName,
			username,
			email,
			phone,
			address,
		};
		await Admin.updateOne({ _id }, { ...details });
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
 * ! To be Tested
 */
exports.editAdminPassword = async (req, res) => {
	const { password, newPassword } = req.body;
	const { _id } = req.body;
	try {
		// TODO: Request body error handling here

		const admin = await Admin.findById(_id);
		if (!admin) throw new Error('Unable to find admin');

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
	const { _id } = req.admin;
	const { password } = req.body;
	try {
		// Admin Check
		const admin = await Admin.findById(_id);
		if (!admin) throw new Error('Unable to find admin');

		// Password Check
		if (!password)
			throw new Error(
				"{password} : 'String' should be there in Request Body."
			);
		if (typeof password !== 'string')
			throw new Error('{password} should be a string.');
		const validated = await admin.authenticatePassword({ password });
		if (!validated) throw new Error('Wrong Password');
		await admin.delete();

		// Sending Response upon successful deletion of admin account
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
 * @description Logout Admin
 * @route POST /api/admin/logout
 * @data No data to be passed
 * @access Admin
 */
exports.logoutAdmin = async (req, res) => {
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
