'use strict';

const { defaultRoutes } = require('../../helper/routes');
const {
	requestErrorHandler,
	isValidatedApi,
} = require('../../helper/functions');

module.exports = async function (requester) {
	const defaults = {};

	try {
		// Validate API Key before allowing any Requests
		await isValidatedApi(requester);

		/**
		 * @description Request to '/' route, returns data about website.
		 * @returns {Promise} Information about the website
		 */
		defaults.index = async () => {
			const response = await requester.get(defaultRoutes.index);
			return response.data;
		};
	} catch (error) {
		return requestErrorHandler(error);
	}

	return defaults;
};
