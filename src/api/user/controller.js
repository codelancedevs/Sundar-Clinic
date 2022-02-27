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

// User Controller Container
const userController = {};

/* ================================
	UNAUTHENTICATED CONTROLLERS
================================ */

/**
 * @description Checks if a provided email is unique or not
 * @route GET /api/user/isEmailUnique
 * @data {email: 'String' } in Request Body
 * @access Public
 */
userController.isEmailUnique = async (req, res, next) => {
	let { email } = req.body;
	try {
		email = typeof email === 'string' && isEmail(email) ? email : false;
		if (!email)
			throw new Error("Email is either missing or invalid");
		const emailCount = await User.countDocuments({ email });
		const isEmailUnique = !emailCount;
		return res.status(200).json({
			message: `Email is ${isEmailUnique ? '' : 'not '}unique`,
			data: { isEmailUnique },
			success: true,
		});
	} catch (error) {
		return next(error);
	}
};

/**
 * @description Checks if given username is unique or not
 * @route GET /api/user/isUsernameUnique
 * @data {username: 'String' } in Request Body
 * @access Public
 */
userController.isUsernameUnique = async (req, res, next) => {
	let { username } = req.body;
	try {
		username = typeof username === 'string' ? username : false;
		if (!username)
			throw new Error("Username is missing or is invalid");
		const usernameCount = await User.countDocuments({ username });
		const isUsernameUnique = !usernameCount;
		return res.status(200).json({
			message: `Username is ${isUsernameUnique ? '' : 'not '}unique`,
			data: { isUsernameUnique },
			success: true,
		});
	} catch (error) {
		return next(error);
	}
};

/**
 * @description Send a Reset Password Email to the User's requested email
 * @route POST /api/user/email/password
 * @data {email} : 'String' in Request Body
 * @access Public
 */
userController.sendResetPasswordMail = async (req, res, next) => {
	// Collecting Required data from Request Body
	let { email } = req.body;
	try {
		// Type Check
		email = typeof email === 'string' && isEmail(email) ? email : false;
		if (!email)
			throw new Error(
				"Email is either missing or invalid"
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
		return next(error);
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
userController.sendVerifyUserMail = async (req, res, next) => {
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
		return next(error);
	}
};

/** URL AUTH TOKEN BASED AUTHENTICATION
 * @description Authenticate Account
 * @route PATCH /api/user/verify
 * @data {authToken} : 'String' in Request Body
 * @access Public
 */
userController.verifyUser = async (req, res, next) => {
	// Collecting Required data from Request Body
	let { authToken } = req.body;
	try {
		// Type Check
		authToken = typeof authToken === 'string' ? authToken : false;
		if (!authToken)
			throw new Error("authToken is either missing or invalid");

		const userId = authenticateVerifyAuthToken({ authToken });
		if (!userId)
			throw new Error('Link Invalid! Provide a valid link to proceed.');

		// Get User from Provided Auth Token
		const user = await User.findOne({ _id: userId });
		if (!user) throw new Error('Unable to find User');

		// Checking User Verification
		const { isVerified } = user.verification;

		// If User is Verified, then notify account is already verified.
		if (isVerified) throw new Error('Account Already Verified!');

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
		return next(error);
	}
};

/** URL AUTH TOKEN BASED AUTHENTICATION
 * @description Authenticate the reset password link
 * @route PATCH /api/user/email/password
 * @data {authToken} : 'String' in Request Body
 * @access Public
 */
userController.verifyResetPasswordMail = async (req, res, next) => {
	// Collecting Required data from Request Body
	let { authToken } = req.body;
	try {
		// Type Check
		authToken = typeof authToken === 'string' ? authToken : false;
		if (!authToken)
			throw new Error("authToken is either missing or invalid");

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
		return next(error);
	}
};

/** URL AUTH TOKEN BASED AUTHENTICATION
 * @description Reset Password of user
 * @route PATCH /api/user/resetPassword
 * @data {authToken, password} : 'String' in Request Body
 * @access Public
 */
userController.resetUserPassword = async (req, res, next) => {
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

		if (!isStrongPassword(password)) throw new Error('Password is not Strong!');

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
		return next(error);
	}
};

/**
* @description Check is Email is available for a logged in User
* @route GET /api/user/isEmailAvailable
* @data {email} : 'String' in Request Body
* @access User
*/
userController.isEmailAvailable = async (req, res, next) => {
	// Collecting Required Data from Middleware and Request Body
	const { user } = req.user;
	const { email } = req.body;
	try {
		const emailCount = await User.countDocuments({ '$or': [{ email: user.email }, { email }] });
		const isEmailAvailable = emailCount === 1;
		return res
			.status(200)
			.json({
				message: `Email is ${isEmailAvailable ? '' : 'not '}available`,
				data: { isEmailAvailable },
				success: true,
			});
	} catch (error) {
		return next(error);
	}
};

/**
* @description Check is Username is available for a logged in User
* @route GET /api/user/isUsernameAvailable
* @data {username} : 'String' in Request Body
* @access User
*/
userController.isUsernameAvailable = async (req, res, next) => {
	// Collecting Required Data from Middleware and Request Body
	const { user } = req.user;
	const { username } = req.body;
	try {
		const usernameCount = await User.countDocuments({ '$or': [{ username: user.username }, { username }] });
		const isUsernameAvailable = usernameCount === 1;
		return res
			.status(200)
			.json({
				message: `Username is ${isUsernameAvailable ? '' : 'not '}available`,
				data: { isUsernameAvailable },
				success: true,
			});
	} catch (error) {
		return next(error);
	}
};

// Exporting User Controller
module.exports = userController;

