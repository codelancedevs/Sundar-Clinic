'use strict';

// Importing Packages
const Router = require('express').Router();
const { authAdmin } = require('../../helper/middleware');

// Importing all Routers
const indexController = require('./controller');
const userRouter = require('../user');
const adminRouter = require('../admin');
const patientRouter = require('../patient');
const postsRouter = require('../posts');

// Using Routers at specified HTTP Endpoints
Router.use('/api/user', userRouter);
Router.use('/api/admin', adminRouter);
Router.use('/api/patient', patientRouter);
Router.use('/api/post', postsRouter);

/* ================================
    UNAUTHENTICATED ROUTES
================================ */

Router.get('/', indexController.sendSiteDetails);

Router.get('/index', indexController.redirectToIndex);

/* ================================
    AUTHENTICATED ROUTES
================================ */

Router.patch(
	'/api/app/ownerDetails',
	authAdmin,
	indexController.editOwnerDetails
);

Router.patch(
	'/api/app/siteDetails',
	authAdmin,
	indexController.editSiteDetails
);

module.exports = Router;