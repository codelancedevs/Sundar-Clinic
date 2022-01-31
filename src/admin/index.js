'use strict';

const { isEmail, isStrongPassword } = require('validator');
const { adminRoutes } = require('../../helper/routes');
const {
	requestErrorHandler,
	isValidatedApi,
} = require('../../helper/functions');

module.exports = async function (requester) {
	const admin = {};

	try {
		await isValidatedApi(requester);

		/**
		 * @description Create a new Admin by passing in the required data
		 * @param {object} data Includes {fullName, email, password, superPassword}
		 * @returns {Promise} confirmation of admin creation
		 */
		admin.create = async (data = {}) => {
			// Information required to create user
			const {
				fullName = '',
				email = '',
				password = '',
				superPassword = '',
			} = data;
			// Pre Checks
			if (!superPassword)
				throw new Error(
					"Cannot create admin without {superPassword: 'string'}"
				);
			if (!fullName || !email || !password)
				throw new Error(
					"{fullName, email, password} : 'string' is required"
				);
			// Type Check
			if (typeof superPassword !== 'string')
				throw new Error(
					`superPassword should be a string, cannot be ${typeof superPassword}`
				);
			if (typeof email !== 'string')
				throw new Error(
					`email should be a string, cannot be ${typeof email}`
				);
			if (typeof username !== 'string')
				throw new Error(
					`username should be a string, cannot be ${typeof username}`
				);
			if (typeof password !== 'string')
				throw new Error(
					`password should be a string, cannot be ${typeof password}`
				);
			// Validity Check
			if (!isEmail(email)) throw new Error('Email should be valid!');
			const passwordScore = isStrongPassword(password, {
				returnScore: true,
			});
			if (passwordScore < 50)
				throw new Error(
					`{
							"error":"Password not strong enough",
							"minLength":8,
							"minLowercase":1,
							"minUppercase":1,
							"minNumbers":1,
							"minSymbols":1,
							"points":{
								"acquired":${passwordScore},
								"required":50
							}
						}`
				);

			// Sending Request
			const response = await requester.post(adminRoutes.create, {
				data,
			});
			return response;
		};

		/**
		 * @description Login admin with required credentials
		 * @param {object} data {email, password}
		 * @returns {Promise} Admin Login with JWT Cookie
		 */
		admin.login = async (data = {}) => {
			const { email = '', password = '' } = data;
			// Pre Checks
			if (!email || !password)
				throw new Error("{email, password} : 'string' is required");
			if (typeof email !== 'string')
				throw new Error(
					`email should be a string, cannot be ${typeof email}`
				);
			if (typeof password !== 'string')
				throw new Error(
					`password should be a string, cannot be ${typeof password}`
				);
			if (!isEmail(email)) throw new Error('Email should be valid!');

			// Sending Request
			const response = await requester.post(adminRoutes.login, {
				data,
			});
			return response;
		};
	} catch (error) {
		return requestErrorHandler(error);
	}

	return admin;
};
