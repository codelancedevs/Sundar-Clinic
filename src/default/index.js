'use strict';

const { defaultRoutes } = require('../routes');

module.exports = function (requester) {
	return {
		index: async function () {
            const response = await requester.get(defaultRoutes.index);
            return response;
		},
	};
};
