'use strict';

const { defaultRoutes } = require('../../helper/routes');
const {
	requestErrorHandler,
	isValidatedApi,
} = require('../../helper/functions');

module.exports = function (requester) {
	const defaults = {};

	/**
	 * @description Request to '/' route, returns data about website.
	 * @returns {Promise} Information about the website
	 */
	defaults.index = async () => {
		try {
			await isValidatedApi(requester);
			const response = await requester.get(defaultRoutes.index);
			return response.data;
		} catch (error) {
			return requestErrorHandler(error);
		}
	};

	return defaults;
};
