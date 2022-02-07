'use strict';

const axios = require('../helper/axios.config');
const { apiKey } = require('../helper/config');

const defaults = require('./default');
const user = require('./user');
const admin = require('./admin');
const patient = require('./patient');
const post = require('./post');
const { isValidatedApi } = require('../helper/functions');

class SundarClinicSDK {
	constructor(apiKey, options = {}) {
		this.apiKey = apiKey;
		this.options = options;
		this.allowed = false;
		const setApiKey = async (key) => {
			if (!key) throw new Error('Sundar Clinic SDK Requires an API Key!');
			if (typeof key !== 'string')
				throw new Error(
					`API Key should be string, cannot be ${typeof key}`
				);
			axios.defaults.headers.common['X-API-Key'] = key;
			await isValidatedApi(axios);
		};

		const setSdkDefaults = () => {
			this.options.logging = true;
		};

		setSdkDefaults();
		setApiKey(this.apiKey);
	}

	get user() {
		return user(axios);
	}

	get default () {
		defaults(axios)
		.then(res => {
			this.set = res;
		})
		// return defaults(axios);
	}

	get admin() {
		return admin(axios);
	}

	get patient() {
		return patient(axios);
	}

	get post() {
		return post(axios);
	}
}

const sundarClinic = new SundarClinicSDK(apiKey);

// sundarClinic.default
// 	.index()
// 	.then((res) => console.log(res))
// 	.catch((err) => console.log(err));

console.log(sundarClinic.default)
module.exports = SundarClinicSDK;
