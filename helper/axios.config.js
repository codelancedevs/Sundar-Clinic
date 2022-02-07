'use strict';

const axios = require('axios').default;
const { backendUrl } = require('./config');

axios.defaults.baseURL = backendUrl;
axios.defaults.headers.common['x-sdk-req'] = 'SDK-SS';

module.exports = axios;
