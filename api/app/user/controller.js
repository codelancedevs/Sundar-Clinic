/**
 * User Controllers
 */

'use strict';

// Dependencies
const User = require('./model');
const { isEmail } = require('validator');

/* ================================
    UNAUTHENTICATED CONTROLLERS
================================ */

/**
 * @description Checks if a provided email is unique or not
 * @route GET /api/user/isEmailUnique
 * @data {email: 'String' } in Request Body
 * @access Public
 */
exports.isEmailUnique = async (req, res) => {
	const { email } = req.body;
	try {
		if (!email)
			throw new Error("{email: 'String'} is required in Request Body");
		if (typeof email !== 'string')
			throw new Error('{email} should be a string');
		if (!isEmail(email))
			throw new Error('Given Email is not a valid Email Address');
		const emailCount = await User.countDocuments({ email });
		const isEmailUnique = !emailCount;
		return res.status(200).json({
			message: `Email is ${isEmailUnique ? '' : 'not '}unique`,
			data: { isEmailUnique },
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
 * @description Checks if given username is unique or not
 * @route GET /api/user/isUsernameUnique
 * @data {username: 'String' } in Request Body
 * @access Public
 */
exports.isUsernameUnique = async (req, res) => {
	const { username } = req.body;
	try {
		if (!username)
			throw new Error(
				"{username: 'String'} is required in the Request Body"
			);
		if (typeof username !== 'string')
			throw new Error('{username} should be a string');
		const usernameCount = await User.countDocuments({ username });
		const isUsernameUnique = !usernameCount;
		return res.status(200).json({
			message: `Username is ${isUsernameUnique ? '' : 'not '}unique`,
			data: { isUsernameUnique },
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
exports.sendVerifyUserMail = (req, res) => {};

/**
 * @description <Controller description here>
 * @route METHOD <Route>
 * @data <Data either in body, params, or query>
 * @access <Access Level>
 * ! To be Tested
 */
exports.sendResetPasswordMail = (req, res) => {};

/* ================================
    AUTHENTICATED CONTROLLERS
================================ */

/** URL AUTH TOKEN BASED AUTHENTICATION
 * @description Authenticate Admin Account from the Link clicked by email
 * @route PATCH
 * @data <Data either in body, params, or query>
 * ? Data to be implemented
 * @access Public
 * ! To be Tested
 */
exports.verifyUser = (req, res) => {};

/** URL AUTH TOKEN BASED AUTHENTICATION
 * @description <Controller description here>
 * @route METHOD <Route>
 * @data <Data either in body, params, or query>
 * @access <Access Level>
 * ! To be Tested
 */
exports.verifyResetPasswordMail = (req, res) => {};

/** URL AUTH TOKEN BASED AUTHENTICATION
 * @description <Controller description here>
 * @route METHOD <Route>
 * @data <Data either in body, params, or query>
 * @access <Access Level>
 * ! To be Tested
 */
exports.resetUserPassword = (req, res) => {};
