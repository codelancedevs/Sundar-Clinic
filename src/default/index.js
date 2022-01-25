'use strict';

const { defaultRoutes } = require('../../helper/routes');

module.exports = function (requester) {
	return {
		index: async function () {
			try {
				const response = await requester.get(defaultRoutes.index);
				return response.data;
			} catch (error) {
				return error.response.data;
			}
		},
	};
};
