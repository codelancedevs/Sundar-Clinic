'use strict';

const requestErrorHandler = function (error) {
	const err = error?.response ? error?.response?.data : error;
	return err;
};

const checkApiKeyValidity = async function (requester) {
	try {
		const checkApiKey = await requester.get('/verifyApiKey');
		return checkApiKey.data.success;
	} catch (error) {
		return error.response.data.success;
	}
};

const isValidatedApi = async (requester) => {
	const isValid = await checkApiKeyValidity(requester);
	if (!isValid) throw new Error('API Key not Authorized');
};

module.exports = {
	requestErrorHandler,
	checkApiKeyValidity,
	isValidatedApi,
};
