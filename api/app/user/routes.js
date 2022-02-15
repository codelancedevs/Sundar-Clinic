/**
 * User Routes
 */

'use strict';

// Dependencies
const Router = require('express').Router();
const userController = require('./controller');
const { generalAuth } = require('../../helper/middleware')

/* ================================
    UNAUTHENTICATED ROUTES
================================ */

Router.get('/isEmailUnique', userController.isEmailUnique);

Router.get('/isUsernameUnique', userController.isUsernameUnique);

Router.post('/email/verify', generalAuth,userController.sendVerifyUserMail);

Router.post('/email/password', userController.sendResetPasswordMail);

/* ================================
    AUTHENTICATED ROUTES
================================ */

Router.patch('/email/verify', userController.verifyUser);

Router.patch('/email/password', userController.verifyResetPasswordMail);

Router.patch('/resetPassword', userController.resetUserPassword);

module.exports = Router;
