
"use strict";
const Router = require('express').Router();
const { authPatient } = require('../../helper/middleware');
const patientController = require('./controller');

module.exports = Router;