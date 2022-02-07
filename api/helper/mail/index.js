/**
 * Mailer Functions
 */

'use strict';

// Dependencies
const nodemailer = require('nodemailer');
const {
	mail: { email, password: pass },
} = require('../config');

// Mail Transporter
const mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	auth: { email, pass },
});

module.exports = {};
