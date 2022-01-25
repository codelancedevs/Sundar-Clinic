'use strict';

const { isEmail, isStrongPassword } = require('validator');
const { patientRoutes } = require('../../helper/routes');
const { requestErrorHandler } = require('../../helper/functions');

module.exports = function (requester) {
	return {
		create: async function () {},

		login: async function () {},
	};
};
