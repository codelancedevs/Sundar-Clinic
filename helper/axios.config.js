'use strict';

const axios = require('axios');
const { backendUrl } = require('./config');

axios.default.defaults.baseURL = backendUrl;
axios.default.defaults.headers.common['x-sdk-req'] = 'SDK-SS';

module.exports = axios;
