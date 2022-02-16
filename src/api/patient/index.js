/**
 * Patient Hub
 */

"use strict";

// Dependencies
const Router = require("express").Router();
const patientRouter = require("./routes");

Router.use(patientRouter);

module.exports = Router;