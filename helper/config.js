'use strict';

require('dotenv').config();

const isLocalEnvironment = Boolean(process.env.IS_LOCAL)
const backendUrl = isLocalEnvironment ? process.env.DEVELOPMENT_URL : process.env.BACKEND_URL

const apiKey = process.env.API_KEY

module.exports = {
	backendUrl,
	apiKey,
};
