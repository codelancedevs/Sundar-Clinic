/**
 * Application Controllers
 */

'use strict';

// Dependencies
const { reactAppUrl, appId, apiKeys } = require('../../helper/config');
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
	if (!appId) {
		return res.status(200).json({
			message: 'App Details being Updated',
			data: {},
			success: true,
		});
	}
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

/**
 * @description Checks the validity of API key from SDK
 * @route GET /verifyApiKey
 * @data API key in headers and additional sdk details in headers
 * @access Public
 */
exports.verifyApiKey = (req, res) => {
	const providedKey = req.headers['x-api-key'];
	const isFromSDK = req.headers['x-sdk-req'] === 'SDK-SS';
	try {
		if (!providedKey && !isFromSDK) throw new Error('API Key is required!');
		const isValidApiKey = apiKeys.includes(providedKey);
		if (!isValidApiKey)
			throw new Error(
				'Unauthorized API Key, Please provide a authorized API Key'
			);
		return res.status(200).json({
			message: 'Authorized API Key',
			data: { isValidApiKey },
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res
			.status(401)
			.json({ message: error.message, data: {}, success: false });
	}
};

/* ================================
    AUTHENTICATED CONTROLLERS
================================ */

/**
 * @description <Controller description here>
 * @route METHOD <Route>
 * @data <Data either in body, params, or query>
 * @access <Access Level>
 * ! To be Tested
 */
exports.editOwnerDetails = (req, res) => {};

/**
 * @description <Controller description here>
 * @route METHOD <Route>
 * @data <Data either in body, params, or query>
 * @access <Access Level>
 * ! To be Tested
 */
exports.editSiteDetails = async (req, res) => {
	const { detail, contact, link } = req.body;
	const { email, phone } = contact;
	try {
		if (!detail || !contact || !link)
			throw new Error(
				'Request body should contain {detail, contact, link} : String'
			);
		if (!phone || !email)
			throw new Error(
				'Contact should contain contact: {phone, email} : String'
			);

		const site = {
			detail,
			contact: { email, phone },
			link,
		};
		await App.updateOne(
			{ _id: appId },
			{
				'site.$': site,
			}
		);
		return res.status(200).json({
			message: 'Site Detail Updated Successfully',
			data: { detail, contact, link },
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res
			.status(401)
			.json({ message: error.message, data: {}, success: false });
	}
};
