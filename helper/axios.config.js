'use strict';

const axios = require('axios');
const { backendUrl } = require('./config');

axios.default.defaults.baseURL = backendUrl;

module.exports = axios;
