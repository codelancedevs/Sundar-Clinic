'use strict';

const defaultRoutes = {
	index: '/',
};

const userRoutes = {
	isUsernameUnique: '/api/user/isUsernameUnique',
	isEmailUnique: '/api/user/isEmailUnique',
};

const adminRoutes = {
	create: '/api/admin/create',
	login: 'api/admin/login',
};

const patientRoutes = {};

module.exports = {
	defaultRoutes,
	userRoutes,
	adminRoutes,
	patientRoutes,
};
