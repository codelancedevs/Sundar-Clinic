'use strict';

const { isEmail, isStrongPassword } = require('validator');
const { postRoutes } = require('../../helper/routes');
const {
	requestErrorHandler,
	isValidatedApi,
} = require('../../helper/functions');

module.exports = async function (requester) {
	const post = {};

	try {
		await isValidatedApi;
		post.create = async () => {};

		post.edit = async () => {};

		post.delete = async () => {};
	} catch (error) {
		return requestErrorHandler(error);
	}

	return post;
};
