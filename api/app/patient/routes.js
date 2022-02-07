/**
 * Patient Routes
 */

'use strict';

// Dependencies
const Router = require('express').Router();
const { authPatient } = require('../../helper/middleware');
const patientController = require('./controller');

/* ================================
    UNAUTHENTICATED ROUTES
================================ */

Router.post('/create', patientController.createPatient);

Router.post('/login', patientController.loginPatient);

/* ================================
AUTHENTICATED ROUTES
================================ */

Router.patch('/details', authPatient, patientController.editPatientDetails);

Router.patch('/password', authPatient, patientController.editPatientPassword);

Router.post('/logout', authPatient, patientController.logoutPatient);

Router.delete('/delete', authPatient, patientController.deletePatientAccount);

module.exports = Router;
