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

Router.patch('/details', authAdmin, adminController.editAdminDetails);

Router.patch('/password', authAdmin, adminController.editAdminPassword);

Router.post('/logout', authAdmin, adminController.logoutAdmin);

Router.delete('/delete', authAdmin, adminController.deleteAdminAccount);

module.exports = Router;
