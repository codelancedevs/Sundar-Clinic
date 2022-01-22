'use strict';

const { reactAppUrl, appId } = require('../../helper/config');
const App = require('./model');

/* ================================
    UNAUTHENTICATED CONTROLLERS
================================ */

/**
 * @description Sends details about the api created
 * @route GET /
 * @data No data required
 * @access Public
 */
exports.sendSiteDetails = async (req, res) => {
	if (!appId)
		return res.status(200).json({
			message: 'App Details being Updated',
			data: {},
			success: true,
		});
	const appDetails = await App.findById(appId).select({ _id: 0, __v: 0 });
	return res.status(200).json({
		message:
			'API created for Sundar Clinic By Codelance Devs, made with 💖 by Kunal Keshan',
		data: { ...appDetails.toObject() },
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

exports.editOwnerDetails = (req, res) => {};

exports.editSiteDetails = (req, res) => {};
