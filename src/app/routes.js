'use strict';

// Importing all Routers
const Router = require('express').Router();
const indexController = require('./controller');
const userRouter = require('./user');
const adminRouter = require('./admin');
const patientRouter = require('./patient');
const postsRouter = require('./posts');

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

module.exports = Router;
