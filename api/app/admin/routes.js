'use strict';

// Importing Packages
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

Router.delete("/delete", authAdmin, adminController.deleteAdminAccount);

module.exports = Router;
