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

Router.patch('/accountDetails', authPatient, patientController.editPatientAccountDetails);

Router.patch('/generalDetails', authPatient, patientController.editPatientGeneralDetails);

Router.patch('/password', authPatient, patientController.editPatientPassword);

Router.post('/logout', authPatient, patientController.logoutPatient);

Router.delete('/delete', authPatient, patientController.deletePatientAccount);

// Patient Features Route

Router.post('/presentingComplaint', authPatient, patientController.updatePresentingComplaint);

Router.patch('/presentingComplaint', authPatient, patientController.editPresentingComplaint);

Router.delete('/presentingComplaint', authPatient, patientController.deletePresentingComplaint);

Router.post('/history', authPatient, patientController.updateHistoryDetails);

Router.patch('/history', authPatient, patientController.editHistoryDetails);

Router.delete('/history', authPatient, patientController.deleteHistoryDetails);

module.exports = Router;
