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

const TEMPLATE_ID = {
	welcomeAndVerify: 'd-094c1bf65e8d4caab54815145597b89f',
	verifyAccount: 'd-2fb893052ee14b93a79f8261dc7268d5',
	resetPassword: 'd-7c2dba6f14554396b3cf997feea7e5c1',
}

const sendMail = async (options = {}) => {
	const DEFAULTS = {
		from: `Sundar Clinic ${email}`,
		replyTo: email,
	};

	const onError = (err) => err;
	const onSuccess = (response) => response;

	return sgMail.send({ ...DEFAULTS, ...options, }).then(onSuccess).catch(onError);
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
		templateId: TEMPLATE_ID.welcomeAndVerify,
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
		templateId: TEMPLATE_ID.verifyAccount,
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
		templateId: TEMPLATE_ID.resetPassword,
		dynamicTemplateData: { fullName, url }
	});
};

module.exports = mailer;
