'use strict';

const User = require("./model");


/* ================================
    UNAUTHENTICATED CONTROLLERS
================================ */

exports.isEmailUnique = async (req, res) => {
	const { email } = req.body;
	try {
		// TODO: Error handling here
		const emailCount = await User.countDocuments({ email });
		const isEmailUnique = !emailCount;
		return res.status(200).json({
			message: `Email is ${isEmailUnique ? '' : 'not '}unique`,
			data: { isEmailUnique },
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({ message: error.message, data: {}, success: false });
	}
};

exports.isUsernameUnique = async (req, res) => {
	const { username } = req.body;
	try {
		// TODO: Error handling here
		const usernameCount = await User.countDocuments({ username });
		const isUsernameUnique = !usernameCount;
		return res.status(200).json({
			message: `Username is ${isUsernameUnique ? '' : 'not '}unique`,
			data: { isUsernameUnique },
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({ message: error.message, data: {}, success: false });
	}
};


/* ================================
    AUTHENTICATED CONTROLLERS
================================ */