/**
 * Mailer Functions
 */

'use strict';

// Dependencies
const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');
const juice = require('juice');
const { htmlToText } = require('html-to-text');
const {
	reactAppUrl,
	mail: { email, password },
} = require('../config');
const {
	createAccountVerificationToken,
	createResetPasswordToken,
} = require('../functions');
const { mailCallback, mailConfig, generateHtmlAndText } = require('./functions');

// Mail Transporter
const mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: email,
		pass: password,
	},
	from: `Sundar Clinic <${email}>`,
});

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

	const { html, text } = await generateHtmlAndText('welcomeAndVerify', {
		reactAppUrl,
		token,
		fullName,
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

	const { html, text } = generateHtmlAndText('verifyAccount', {
		reactAppUrl,
		token,
	});

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
	const token = createResetPasswordToken({ _id });

	const { html, text } = generateHtmlAndText('resetPassword', {
		reactAppUrl,
		token,
	});

	// Creating Mail Config
	const config = mailConfig({
		to,
		subject: 'Reset Your Password',
		html: `Click to reset your password ${reactAppUrl}/resetPassword/authToken=${token}`,
	});

	// Sending Email
	mailTransporter.sendMail(config, mailCallback);
};
