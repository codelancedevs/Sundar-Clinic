'use strict';

const { defaultRoutes } = require('../../helper/routes');
const { requestErrorHandler, isValidatedApi } = require('../../helper/functions');

module.exports = function (requester) {
	return {
		/**
		 * @description Request to '/' route, returns data about website.
		 * @returns {Promise} Information about the website
		 */
		index: async function () {
			try {
				await isValidatedApi(requester)
				const response = await requester.get(defaultRoutes.index);
				return response.data;
			} catch (error) {
				return requestErrorHandler(error);
			}
		},
	};
};
