"use strict";

const jwt = require('jsonwebtoken');
const {
	expireDurations: {
		verificationExpireAt,
		passwordResetExpireAt,
		tokenExpireAt,
	},
	secrets: { verificationSecret, passwordResetSecret, deleteAccountSecret },
} = require('../config');

exports.createAccountVerificationToken = ({ id = '' }) => {
	return jwt.sign({ id }, verificationSecret, {
		expiresIn: verificationExpireAt,
	});
};

exports.createPasswordResetToken = ({ id = '' }) => {
	return jwt.sign({ id }, passwordResetSecret, passwordResetExpireAt);
};

exports.deleteAccountToken = ({ id = '' }) => {
	return jwt.sign({ id }, deleteAccountSecret, tokenExpireAt);
};
