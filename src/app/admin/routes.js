'use strict';

// Importing Packages
const Router = require('express').Router();
const { authAdmin } = require('../../helper/middleware');
const adminController = require("./controller");

/* ================================
    UNAUTHENTICATED ROUTES
================================ */

Router.post("/create", adminController.createAdmin);

/* ================================
    AUTHENTICATED ROUTES
================================ */

module.exports = Router;
