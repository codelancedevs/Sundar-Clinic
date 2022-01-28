'use strict';

const { isEmail, isStrongPassword } = require('validator');
const { postRoutes } = require('../../helper/routes');
const { requestErrorHandler } = require('../../helper/functions');

module.exports = function (requester) {
	const post = {};

	post.create = async () => {};

	post.edit = async () => {};

	post.delete = async () => {};

	return post;
};
