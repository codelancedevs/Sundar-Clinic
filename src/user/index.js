'use strict';

const { userRoutes } = require('../../helper/routes');
const { isEmail } = require('validator');
const { requestErrorHandler } = require('../../helper/functions');

module.exports = function (requester) {
	return {
		/**
		 * @description Checks if a username is unique or not
		 * @param {string} {username} - object with username
		 * @returns Promise
		 */
		isUsernameUnique: async function ({ username = '' }) {
			try {
				// Pre checks
				if (!username)
					throw new Error(
						'Object should contain {username: "string"}'
					);
				if (typeof username !== 'string')
					throw new Error(
						`{username} should be string, cannot be ${typeof username}`
					);
				if (username.length < 8 || username.length > 16)
					throw new Error(
						'username should be more that 8 and less that 16 characters'
					);

				// Send Request
				const response = await requester.get(
					userRoutes.isUsernameUnique,
					{
						username,
					}
				);
				return response.data;
			} catch (error) {
				return requestErrorHandler(error);
			}
		},

		/**
		 * @description Checks if a email is unique or not
		 * @param {string} {email} - object with username
		 * @returns Promise
		 */
		isEmailUnique: async function ({ email = '' }) {
			try {
				// Pre checks
				if (!email)
					throw new Error('Object should contain {email: "string"}');
				if (typeof email !== 'string')
					throw new Error(
						`{email} should be string, cannot be ${typeof email}`
					);
				if (!isEmail(email))
					throw new Error('Should be a valid email!');

				// Send Request
				const response = await requester.get(userRoutes.isEmailUnique, {
					email,
				});
				return response.data;
			} catch (error) {
				return requestErrorHandler(error);
			}
		},
	};
};
