'use strict';

const Admin = require('./model');

/* ================================
    UNAUTHENTICATED CONTROLLERS
================================ */

exports.isEmailUnique = async (req, res) => {
	try {
		const { email } = req.body;
		// TODO: Error handling here
		const emailCount = Admin.countDocuments({ email });
		const isEmailUnique = !emailCount;
		return res
			.status(200)
			.json({
				message: `Email is ${isEmailUnique ? '' : 'not '}unique`,
				data: { isEmailUnique },
				success: true,
			});
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({ message: error.message, data: {}, success: true });
	}
};

exports.isUsernameUnique = (req, res) => {};

exports.createAdmin = (req, res) => {};

exports.loginAdmin = (req, res) => {};

/* ================================
    AUTHENTICATED CONTROLLERS
================================ */
