/**
 * Mailer Functions
 */

'use strict';

// Dependencies
const sgMail = require('@sendgrid/mail');

const {
	reactAppUrl,
	sendGridApiKey,
	mail: { email, password },
} = require('../config');
const {
	createAccountVerificationToken,
	createResetPasswordToken,
} = require('../functions');

// Configure SendGrid 
sgMail.setApiKey(sendGridApiKey);
const sgMailDefaults = {
	from: `Sundar Clinic ${email}`,
	replyTo: email,
};

const sendMail = async (options = {}) => {
	const DEFAULTS = {
		from: `Sundar Clinic ${email}`,
		replyTo: email,
	};

	const onError = (err) => err;
	const onSuccess = (response) => response;

	return sgMail.send({ ...DEFAULTS, ...options }).then(onSuccess).catch(onError);
}

// Mailer Container
const mailer = {};

/**
 * @description Sends a welcome Email to new user and Prompts them to verify their account
 * @param {string} _id
 * @param {string} to
 * @param {string} fullName
 */
mailer.sendWelcomeAndVerifyAccountEmail = async ({
	_id = '',
	to = '',
	fullName = '',
}) => {
	// Pre Checks
	if (!to || !fullName || !_id)
		throw new Error(
			'{to, fullName, _id} : String is Required to send email!'
		);

	// Creating Verification Token
	const token = createAccountVerificationToken({ _id });
	const url = `${reactAppUrl}/verifyAccount/authToken=${token}`;

	// Sending Welcome and Verify Email
	await sendMail({
		to,
		dynamicTemplateData: { fullName, url }
	});
};

/**
 * @description Sends a verify account link to the user who requested for one
 * @param {string} _id
 * @param {string} to
 * @param {string} fullName
 */
mailer.sendVerifyAccountEmail = async ({
	_id = '',
	to = '',
	fullName = '',
}) => {
	// Pre Checks
	if (!to || !fullName || !_id)
		throw new Error(
			'{to, fullName, _id} : String is Required to send email!'
		);

	// Creating Verification Token
	const token = createAccountVerificationToken({ _id });
	const url = `${reactAppUrl}/verifyAccount/authToken=${token}`;

	// Sending Verify Account Email
	await sendMail({
		to,
		dynamicTemplateData: { fullName, url }
	});
};

/**
 * @description Sends a reset password link to allow user to reset their account password
 * @param {string} _id
 * @param {string} to
 * @param {string} fullName
 */
mailer.sendResetPasswordEmail = async ({
	_id = '',
	to = '',
	fullName = '',
}) => {
	// Pre Checks
	if (!to || !fullName || !_id)
		throw new Error(
			'{to, fullName, _id} : String is Required to send email!'
		);

	// Creating Verification Token
	const token = createResetPasswordToken({ _id });
	const url = `${reactAppUrl}/resetPassword/authToken=${token}`;

	// Sending Reset Password Email
	await sendMail({
		to,
		dynamicTemplateData: { fullName, url }
	});
};

module.exports = mailer;
