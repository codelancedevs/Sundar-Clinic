'use strict';

const { defaultRoutes } = require('../../helper/routes');
const { requestErrorHandler } = require('../../helper/functions');

module.exports = function (requester) {
	return {
		/**
		 * @description Request to '/' route, returns data about website.
		 * @returns {Promise} Information about the website
		 */
		index: async function () {
			try {
				const response = await requester.get(defaultRoutes.index);
				return response.data;
			} catch (error) {
				return requestErrorHandler(error);
			}
		},
	};
};
