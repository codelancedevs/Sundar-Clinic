"use strict";

const jwt = require("jsonwebtoken");

exports.authAdmin = (req, res, next) => {
    const token = req.signedCookies.adminToken;
}

exports.authPatient = (req, res, next) => {
    const token = req.signedCookies.patientToken;
}