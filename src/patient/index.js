'use strict';

const { isEmail, isStrongPassword } = require('validator');
const { patientRoutes } = require('../../helper/routes');
const { requestErrorHandler } = require('../../helper/functions');

module.exports = function (requester) {
	const patient = {};

	patient.create = async () => {};

	patient.login = async () => {};

	return patient;
};
