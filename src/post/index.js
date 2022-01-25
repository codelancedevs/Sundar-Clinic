'use strict';

const { isEmail, isStrongPassword } = require('validator');
const { postRoutes } = require('../../helper/routes');
const { requestErrorHandler } = require('../../helper/functions');

module.exports = function (requester) {
	return {
		create: async function () {},

		edit: async function () {},

		delete: async function () {},
	};
};
