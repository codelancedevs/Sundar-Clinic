'use strict';

const { reactAppUrl } = require('../helper/config');

/* ================================
    UNAUTHENTICATED CONTROLLERS
================================ */

/**
* @description Sends details about the api created
* @route GET /
* @data No data required
* @access Public
*/
exports.sendSiteDetails = (req, res) => {
	return res.status(200).json({
		message:
			'API created for Sundar Clinic By Codelance Devs, made with 💖 by Kunal Keshan',
		data: {
			site: {
				owner: `© Sundar Clinic 2013-${new Date().getFullYear()}`,
				contact: {
					phone: '8939881708',
					email: 'sundarclinic@gmail.com',
				},
				link: reactAppUrl,
			},
			createdBy: {
				name: `© Codelance Devs 2022-${new Date().getFullYear()}`,
				contact: {
					email: 'contact@codelancedevs.com',
					website: 'https://codelancedevs.com',
				},
			},
		},
		success: true,
	});
};

/**
* @description Redirects to index Route 
* @route GET /index
* @data No data required
* @access Public
*/
exports.redirectToIndex = (req, res) => {
	return res.redirect('/');
};

/* ================================
    AUTHENTICATED CONTROLLERS
================================ */
