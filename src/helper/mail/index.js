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
 * @description Creates a mail config object with param details
 * @param {string} to To whom the email is to be sent
 * @param {string} subject Subject of the email
 * @param {string} html Content of the email
 * @returns {object} Mail config object
 */
const mailConfig = ({ to = '', subject = '', html = '' }) => {
	const config = {
		to,
		subject,
		html,
	};
	return config;
};

/**
 * @description Callback function after sending email
 * @param {object} error Error object, in case of error while sending mail
 * @param {object} data Success object
 */
const mailCallback = (error, data) => {
	if (!error) return;
	console.log(`Error sending email, ${error}`);
};

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

	// Creating Mail Config
	const config = mailConfig({
		to,
		subject: 'Verify Your Account',
		html: `Click to verify your account ${reactAppUrl}/verifyAccount/authToken=${token}`,
	});

	// Sending Email
	mailTransporter.sendMail(config, mailCallback);
};

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

	// Creating Mail Config
	const config = mailConfig({
		to,
		subject: 'Verify Your Account',
		html: `Click to verify your account ${reactAppUrl}/verifyAccount/authToken=${token}`,
	});

	// Sending Email
	mailTransporter.sendMail(config, mailCallback);
};

exports.sendResetPasswordEmail = async ({
	_id = '',
	to = '',
	fullName = '',
}) => {
	if (!to || !fullName || !_id)
		throw new Error(
			'{to, fullName, _id} : String is Required to send email!'
		);

	// Creating Verification Token
	const token = createResetPasswordToken({_id})

	// Creating Mail Config
	const config = mailConfig({
		to,
		subject: 'Reset Your Password',
		html: `Click to reset your password ${reactAppUrl}/resetPassword/authToken=${token}`,
	});

	// Sending Email
	mailTransporter.sendMail(config, mailCallback);
};
