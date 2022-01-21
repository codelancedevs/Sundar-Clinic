'use strict';

const Patient = require('./model');

/* ================================
    UNAUTHENTICATED CONTROLLERS
================================ */

exports.createPatient = async (req, res) => {};

exports.loginPatient = async (req, res) => {};

/* ================================
    AUTHENTICATED CONTROLLERS
================================ */

exports.fetchPatientProfile = async (req, res) => {};

exports.savePatientDetails = async (req, res) => {};
