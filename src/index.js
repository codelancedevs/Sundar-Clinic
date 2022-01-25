'use strict';

const axios = require('../helper/axios.config');

const defaults = require('./default');
const user = require('./user');
const admin = require('./admin');
const patient = require('./patient');
const post = require('./post');

class SundarClinicSDK {
	constructor(apiKey) {
		
		this.apiKey = apiKey;
		setApiKey(this.apiKey);

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
	}

	get user(){
		return user(axios);
	}

	get default() {
		return defaults(axios);
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

module.exports = SundarClinicSDK;

// const sundarClinic = new SundarClinicSDK("afasf");
// sundarClinic.default.index()
// 	.then(res => console.log(res))
// 	.catch(err => console.log(err))
