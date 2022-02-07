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

Router.patch('/accountDetails', authPatient, patientController.editPatientDetails);

Router.patch('/generalDetails', authPatient, patientController.editPatientGeneralDetails);

Router.patch('/password', authPatient, patientController.editPatientPassword);

Router.post('/logout', authPatient, patientController.logoutPatient);

Router.delete('/delete', authPatient, patientController.deletePatientAccount);

// Patient History Routes

Router.patch('/comorbidity', authPatient, patientController.updateComorbidityDetails);

Router.patch('/drug', authPatient, patientController.updateDrugDetails);

Router.patch('/allergies', authPatient, patientController.updateAllergiesDetails);

Router.patch('/family', authPatient, patientController.updateFamilyDetails);

Router.patch('/food', authPatient, patientController.updateFoodDetails);

Router.patch('/sanitary', authPatient, patientController.updateSanitaryDetails);

Router.patch('/occupation', authPatient, patientController.updateOccupationDetails);

Router.patch('/surgical', authPatient, patientController.updateSurgicalDetails);

Router.patch('/pregnancy', authPatient, patientController.updatePregnancyDetails);

Router.patch('/menstrual', authPatient, patientController.updateMenstrualDetails);

Router.patch('/vasectomy', authPatient, patientController.updateVasectomyDetails);

module.exports = Router;
