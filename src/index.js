'use strict';

const axios = require('../helper/axios.config');
const defaults = require('./default');
const admin = require('./admin');

class SundarClinicSDK {
	constructor(apiKey) {
		this.apiKey = apiKey;
		function setApiKey(key) {
			if (!key) throw new Error('Sundar Clinic SDK Requires an API Key!');
			if (typeof key !== 'string')
				throw new Error(
					`API Key should be string, cannot be ${typeof key}`
				);
			axios.default.defaults.headers.common = {
				'X-API-Key': key,
				Accept: 'application/json, text/plain, */*',
			};
		}
		setApiKey(this.apiKey);
	}

	get default() {
		return defaults(axios);
	}

	get admin() {
		return admin(axios);
	}
}

module.exports = SundarClinicSDK;
