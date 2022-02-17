/**
 * Mailer Functions
 */

'use strict';

// Dependencies
const nodemailer = require('nodemailer');
const {
	reactAppUrl,
	mail: { email, password },
} = require('../config');
const {
	createAccountVerificationToken,
	createResetPasswordToken,
} = require('../functions');
const {
	mailCallback,
	mailConfig,
	generateHtmlAndText,
} = require('./functions');

// Mail Transporter
const mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: email,
		pass: password,
	},
	from: `Sundar Clinic <${email}>`,
});

/**
 * @description Sends a welcome Email to new user and Prompts them to verify their account
 * @param {string} _id
 * @param {string} to 
 * @param {string} fullName 
 */
exports.sendWelcomeAndVerifyAccountEmail = async ({
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

	const { html, text } = generateHtmlAndText('welcome', {
		reactAppUrl,
		token,
		fullName,
	});

	// Creating Mail Config
	const config = mailConfig({
		to,
		subject: 'Welcome to Sundar Clinic!',
		html,
		text,
	});

	// Sending Email
	mailTransporter.sendMail(config, mailCallback);
};

/**
 * @description Sends a verify account link to the user who requested for one
 * @param {string} _id
 * @param {string} to 
 * @param {string} fullName 
 */
exports.sendVerifyAccountEmail = async ({
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
	const { html, text } = generateHtmlAndText('verify', {
		fullName,
		url,
		reactAppUrl,
	});

	// Creating Mail Config
	const config = mailConfig({
		to,
		subject: 'Verify Your Account',
		html,
		text,
	});

	// Sending Email
	mailTransporter.sendMail(config, mailCallback);
};

/**
 * @description Sends a reset password link to allow user to reset their account password
 * @param {string} _id
 * @param {string} to 
 * @param {string} fullName 
 */
exports.sendResetPasswordEmail = async ({
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
	const { html, text } = generateHtmlAndText('verify', {
		fullName,
		url,
		reactAppUrl,
	});

	// Creating Mail Config
	const config = mailConfig({
		to,
		subject: 'Reset Your Password',
		html,
		text,
	});

	// Sending Email
	mailTransporter.sendMail(config, mailCallback);
};
