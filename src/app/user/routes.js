'use strict';

const Router = require('express').Router();
const userController = require('./controller');

/* ================================
    UNAUTHENTICATED ROUTES
================================ */

Router.get('/isEmailUnique', userController.isEmailUnique);

Router.get('/isUsernameUnique', userController.isUsernameUnique);

/* ================================
    AUTHENTICATED ROUTES
================================ */

module.exports = Router;
