'use strict';

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

exports.createApp = async ({id, App}) => {
	if (id) return;
	try {
		const app = new App({
			owner: {
				name: 'P Siva Kumar',
				doctorInCharge: {
					name: 'Dr. Ekta Bharti',
					degrees: ['M.B.B.S', 'General Physician'],
				},
			},
		});
        await app.save();
        console.log(`Application Instance Created with id: ${app._id} - ⚠️  Update this Id in the environment!`);
	} catch (error) {
        console.log(error);
    }
};
