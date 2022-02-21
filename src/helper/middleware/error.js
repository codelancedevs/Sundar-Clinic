/**
 * Error Handling Middleware
 */

// Handle Duplicate Key Errors From MondoDB
const handleDuplicateKeyError = (err, res) => {
	const field = Object.keys(err.keyValue);
	const code = 409;
	const error = `An account with that ${field} already exists`;
	return res.status(code).json({ message: error, data: {fields: field}, success: false });
};

// Handle Validation Errors
const handleValidationError = (err, res) => {
	const errors = Object.values(err.errors).map((el) => el.message);
	const fields = Object.values(err.errors).map((el) => el.path);
	const code = 400;
	if (errors.length > 1) {
		const formattedErrors = errors.join(' ');
		return res.status(code).json({ message: formattedErrors, fields });
	} else {
		return res.status(code).json({
			message: errors,
			data: { fields },
			success: false,
		});
	}
};

const handleGeneralError = (err, res) => {
	const code = 400;
	return res
		.status(code)
		.json({ message: err.message, data: {}, success: false });
};

const errHandler = (err, req, res, next) => {
	try {
		console.log(err);
		if (err.name === 'ValidationError')
			return (err = handleValidationError(err, res));
		if (err.code && err.code === 11000)
			return (err = handleDuplicateKeyError(err, res));
		if (err.status && err.status === 404)
			return (err = handle404Error(err, res));
		handleGeneralError(err, res);
	} catch (error) {
		res.status(500).json({
			message: 'An unknown error occurred.',
			data: {},
			success: false,
		});
	}
};

module.exports = errHandler;
