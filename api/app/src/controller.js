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
 * @description Update Owner Details
 * @route PATCH /api/app/ownerDetails
 * @data {name} : 'String' {clinic: {doctors: 'Array', documents: 'Array', address: 'String'}} in Request Body
 * @access Admin
 * ! To be Tested
 */
exports.editOwnerDetails = async (req, res) => {
	// Collecting Required Data from Request Body
	const { name, clinic } = req.body;
	try {
		// Getting App Details
		const app = await App.findById(appId);
		const { owner: ownerDetails } = app;
		// Update Owner Details with Provided Details
		// If details not provided, use default values
		const owner = {
			name: name || ownerDetails.name,
			clinic: {
				address: clinic.address || ownerDetails.clinic.address,
			},
		};

		// Check for complex data to update
		const doctors =
			clinic.doctors instanceof 'Array' ? clinic.doctors : false;
		const documents =
			clinic.documents instanceof 'Array' ? clinic.documents : false;

		owner.clinic.doctors = doctors ? doctors : ownerDetails.clinic.doctors;
		owner.clinic.documents = documents
			? documents
			: ownerDetails.clinic.documents;

		return res.status(200).json({
			message: 'Owner Details Updated Successfully',
			data: {
				owner: { ...app.owner, ...owner },
			},
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({ message: error.message, data: {}, success: false });
	}
};

/**
 * @description Update Site Details
 * @route PATCH /api/app/siteDetails
 * @data {detail, contact: {phone, email}, link} : String in Request Body
 * @access Admin
 * ! To be Tested
 */
exports.editSiteDetails = async (req, res) => {
	// Collecting Required Data from Request Body
	const { detail, contact, link } = req.body;
	try {
		// Getting App Details
		const app = await App.findById(appId);

		// Update Site with Provided Details
		// If details not provided, use default values
		const site = {
			detail: detail || app.site.detail,
			contact: contact || app.site.contact,
			link: link || app.site.link,
		};
		await app.updateOne({ site });

		// Response after successfully updating site details
		return res.status(200).json({
			message: 'Site Detail Updated Successfully',
			data: {
				site: { ...app.site, ...site },
			},
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res
			.status(401)
			.json({ message: error.message, data: {}, success: false });
	}
};
