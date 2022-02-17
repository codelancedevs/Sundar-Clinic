/**
 * User Controllers
 */

'use strict';

// Dependencies
const User = require('./model');
const { isEmail, isStrongPassword } = require('validator');
const {
	authenticateVerifyAuthToken,
	authenticateResetPasswordAuthToken,
} = require('../../helper/functions');
const {
	sendResetPasswordEmail,
	sendVerifyAccountEmail,
} = require('../../helper/mail');
const {
	expireDurations: { tokenExpireAt },
} = require('../../helper/config');

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
 * @description Send a Reset Password Email to the User's requested email
 * @route POST /api/user/email/password
 * @data {email} : 'String' in Request Body
 * @access Public
 */
exports.sendResetPasswordMail = async (req, res) => {
	// Collecting Required data from Request Body
	let { email } = req.body;
	try {
		// Type Check
		email = typeof email === 'string' && isEmail(email) ? email : false;
		if (!email)
			throw new Error(
				"{email} : 'String' is required in Request body or is invalid"
			);

		// Checking if user with given email exists
		const user = await User.findOne({ email });
		if (!user) throw new Error(`No user account found for ${email}`);

		// Sending Reset Password Link if user exists
		sendResetPasswordEmail({
			_id: user._id,
			fullName: user.fullName,
			to: user.email,
		});

		// Response after sending Reset Password Email
		return res.status(200).json({
			message: 'Reset password link set successfully',
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

/* ================================
	AUTHENTICATED CONTROLLERS
================================ */

/**
 * @description Allow User to send a verify account link to their email
 * @route POST /api/user/email/verify
 * @data No data to be sent
 * @access Patient || Admin
 */
exports.sendVerifyUserMail = async (req, res) => {
	// Collecting Required Data from Middleware
	const {
		user: { _id },
	} = req.user;
	try {
		// Find User
		const user = await User.findById(_id);
		if (!user) throw new Error('Unable to find User');

		// Check if user account is already verified
		if (user.verification.isVerified)
			throw new Error('Account Already Verified');

		// Send Verification Email
		await sendVerifyAccountEmail({
			_id,
			to: user.email,
			fullName: user.fullName,
		});

		return res.status(200).json({
			message: 'Verify Account Link Sent Successfully',
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

/** URL AUTH TOKEN BASED AUTHENTICATION
 * @description Authenticate Account
 * @route PATCH /api/user/verify
 * @data {authToken} : 'String' in Request Body
 * @access Public
 */
exports.verifyUser = async (req, res) => {
	// Collecting Required data from Request Body
	let { authToken } = req.body;
	try {
		// Type Check
		authToken = typeof authToken === 'string' ? authToken : false;
		if (!authToken)
			throw new Error(
				"{authToken} : 'String' is required in Request Body"
			);

		const userId = authenticateVerifyAuthToken({ authToken });
		if (!userId)
			throw new Error('Link Invalid! Provide a valid link to proceed.');

		// Get User from Provided Auth Token
		const user = await User.findOne({ _id: userId });
		if (!user) throw new Error('Unable to find User');

		// Checking User Verification
		const { isVerified } = user.verification;

		// If User is Verified, then notify account is already verified.
		if (isVerified) {
			throw new Error('Account Already Verified!');
		}

		// Verify User Account and Login User
		const verifiedAt = Date.now();
		user.verification = {
			isVerified: true,
			verifiedAt,
		};
		await user.save();

		// Creating User Auth Token
		const userToken = await user.generateAuthToken();

		// Sending User Auth Token
		const userType = user.role === 'Admin' ? 'adminToken' : 'patientToken';

		// Response after successfully verifying account
		res.cookie(userType, userToken, {
			httpOnly: true,
			signed: true,
			maxAge: tokenExpireAt,
		});
		return res.status(200).json({
			message: 'Account Verified Successfully!',
			data: {
				user: user.sanitizeAndReturnUser(),
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

/** URL AUTH TOKEN BASED AUTHENTICATION
 * @description Authenticate the reset password link
 * @route PATCH /api/user/email/password
 * @data {authToken} : 'String' in Request Body
 * @access Public
 */
exports.verifyResetPasswordMail = async (req, res) => {
	// Collecting Required data from Request Body
	let { authToken } = req.body;
	try {
		// Type Check
		authToken = typeof authToken === 'string' ? authToken : false;
		if (!authToken)
			throw new Error(
				"{authToken} : 'String' is required in Request Body"
			);

		// Checking validity of given Token
		const userId = authenticateResetPasswordAuthToken({ authToken });
		if (!userId)
			throw new Error('Link Invalid! Provide a valid link to proceed.');

		// Checking if user exists from the token
		const user = await User.findOne({ _id: userId });
		if (!user) throw new Error('Unable to find User');

		// Response after successful validation of Reset Password Token
		return res.status(200).json({
			message: 'Reset Password Token is Valid!',
			data: {
				isValid: true,
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

/** URL AUTH TOKEN BASED AUTHENTICATION
 * @description Reset Password of user
 * @route PATCH /api/user/resetPassword
 * @data {authToken, password} : 'String' in Request Body
 * @access Public
 */
exports.resetUserPassword = async (req, res) => {
	// Collecting Required data from Request Body
	let { authToken, password } = req.body;
	try {
		// Type Check
		authToken = typeof authToken === 'string' ? authToken : false;
		password = typeof password === 'string' ? password : false;
		if (!authToken || !password)
			throw new Error(
				"{authToken, password} : 'String' is required in Request Body"
			);

		// Checking if Given Token is Valid
		const userId = authenticateResetPasswordAuthToken({ authToken });
		if (!userId)
			throw new Error('Link Invalid! Provide a valid link to proceed.');

		// Checking if user exists from the token
		const user = await User.findOne({ _id: userId });
		if (!user) throw new Error('Unable to find User');

		// Check if the old password is the same as the new password
		const isOldPassword = user.authenticatePassword({ password });
		if (isOldPassword)
			throw new Error('Old Password cannot be same as Reset Password');

		if(!isStrongPassword(password)) throw new Error('Password is not Strong!')

		// If new Password
		// Hashing new password and updating User
		const hashedPassword = await user.returnHashedPassword({ password });
		await user.updateOne({ password: hashedPassword });

		// Response after successful Password Reset
		return res.status(200).json({
			message: 'Account Password Reset Successful!',
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
