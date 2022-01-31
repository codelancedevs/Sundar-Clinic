'use strict';

const { isEmail, isStrongPassword } = require('validator');
const { patientRoutes } = require('../../helper/routes');
const {
	requestErrorHandler,
	isValidatedApi,
} = require('../../helper/functions');

module.exports = async function (requester) {
	const patient = {};

	try {
		await isValidatedApi(requester);
		patient.create = async () => {};

		patient.login = async () => {};
	} catch (error) {
		return requestErrorHandler(error);
	}

	return patient;
};
