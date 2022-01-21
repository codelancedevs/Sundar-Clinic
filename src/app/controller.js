'use strict';

const { reactAppUrl } = require('../helper/config');

/* ================================
    UNAUTHENTICATED CONTROLLERS
================================ */

exports.sendSiteDetails = (req, res) => {
	return res.status(200).json({
		message:
			'API created for Sundar Clinic By Codelance Devs, made with 💖 by Kunal Keshan',
		data: {
			site: {
				owner: `© Sundar Clinic ${new Date().getFullYear()}`,
				contact: {
					phone: '8939881702',
					email: 'sundarclinic@gmail.com',
				},
				link: reactAppUrl,
			},
			createdBy: {
				name: `© Codelance Devs ${new Date().getFullYear()}`,
				contact: {
					email: 'contact@codelancedevs.com',
					website: 'codelancedevs.com',
				},
			},
		},
		success: true,
	});
};

exports.redirectToIndex = (req, res) => {
	return res.redirect('/');
};

/* ================================
    AUTHENTICATED CONTROLLERS
================================ */
