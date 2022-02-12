'use strict';

// Dependencies
const Router = require('express').Router();
const { authAdmin, authSuperAdmin } = require('../../helper/middleware');
const adminController = require('./controller');

/* ================================
    UNAUTHENTICATED ROUTES
================================ */

Router.post('/login', adminController.loginAdmin);

/* ================================
AUTHENTICATED ROUTES
================================ */

Router.post('/create', authSuperAdmin, adminController.createAdmin);

Router.patch('/details', authAdmin, adminController.editAdminDetails);

Router.patch('/password', authAdmin, adminController.editAdminPassword);

Router.post('/logout', authAdmin, adminController.logoutAdmin);

Router.delete('/delete', authAdmin, adminController.deleteAdminAccount);

// Patient Control

Router.get('/patient', authAdmin, adminController.fetchPatients);

Router.post('/patient-create', authAdmin, adminController.createNewPatient);

Router.patch('/patient-account', authAdmin, adminController.editPatientAccountDetails);

Router.patch('/patient-general', authAdmin, adminController.editPatientGeneralDetails);

Router.post('/patient-presentingComplaint', authAdmin, adminController.updatePatientPresentingComplaint);

// ! To be tested
Router.patch('/patient-presentingComplaint', authAdmin, adminController.editPatientPresentingComplaint);

// ! To be tested
Router.delete('/patient-presentingComplaint', authAdmin, adminController.deletePatientPresentingComplaint);

Router.post('/patient-history', authAdmin, adminController.updatePatientHistory);

// ! To be tested
Router.post('/patient-history', authAdmin, adminController.updatePatientHistory);

// ! To be tested
Router.post('/patient-history', authAdmin, adminController.updatePatientHistory);

Router.delete('/patient-delete', authAdmin, adminController.deletePatient);

module.exports = Router;
