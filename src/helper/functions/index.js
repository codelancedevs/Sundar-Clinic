/**
 * Common function to be used in application
 */

'use strict';

// Dependencies
const jwt = require('jsonwebtoken');
const {
	expireDurations: { verificationExpireAt, passwordResetExpireAt },
	secrets: { verificationSecret, passwordResetSecret, deleteAccountSecret },
} = require('../config');

/**
 * @description Creates a verify account token
 * @param {string} _id User Id
 * @returns JWT Token
 */
exports.createAccountVerificationToken = ({ _id = '' }) => {
	if (!_id) throw new Error('_id : String is Required to get a token!');
	return jwt.sign({ _id }, verificationSecret, {
		expiresIn: verificationExpireAt,
	});
};

/**
 * @description Creates a reset password token
 * @param {string} _id User Id
 * @returns JWT Token
 */
exports.createResetPasswordToken = ({ _id = '' }) => {
	if (!_id) throw new Error('_id : String is Required to get a token!');
	return jwt.sign({ _id }, passwordResetSecret, {
		expiresIn: passwordResetExpireAt,
	});
};

/**
 * @description Creates a delete account token
 * @param {string} _id User Id
 * @returns JWT Token
 */
exports.createDeleteAccountToken = ({ _id = '' }) => {
	if (!_id) throw new Error('_id : String is Required to get a token!');
	return jwt.sign({ _id }, deleteAccountSecret, {
		expiresIn: passwordResetExpireAt,
	});
};

/**
 * @description Authenticate Verify Account Token
 * @param {string} authToken
 * @returns {string} _id (if valid authToken)
 */
exports.authenticateVerifyAuthToken = ({ authToken = '' }) => {
	try {
		const decoded = jwt.verify(authToken, verificationSecret);
		if (!decoded._id) throw new Error();
		return decoded._id;
	} catch (error) {
		return false;
	}
};

/**
 * @description Authenticate Reset Password Token
 * @param {string} authToken
 * @returns {string} _id (if valid authToken)
 */
exports.authenticateResetPasswordAuthToken = ({ authToken = '' }) => {
	try {
		const decoded = jwt.verify(authToken, passwordResetSecret);
		if (!decoded._id) throw new Error();
		return decoded._id;
	} catch (error) {
		return false;
	}
};

// Authenticate Delete account Token
exports.authenticateDeleteAccountToken = () => { };

exports.createApp = async ({ id, App }) => {
	if (id) return;
	try {
		const app = new App({
			owner: {
				name: 'P. Siva Kumar and Dr. Ekta Bharti',
			},
		});
		await app.save();
		console.log(
			`Application Instance Created with id: ${app._id} - ⚠️  Update this Id in the environment!`
		);
	} catch (error) {
		console.log(error);
	}
};
