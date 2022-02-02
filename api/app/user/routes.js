'use strict';

const Router = require('express').Router();
const userController = require('./controller');

/* ================================
    UNAUTHENTICATED ROUTES
================================ */

Router.get('/isEmailUnique', userController.isEmailUnique);

Router.get('/isUsernameUnique', userController.isUsernameUnique);

Router.get('/email/verify', userController.sendVerifyUserMail);

Router.get('/email/password', userController.sendResetPasswordMail);

/* ================================
    AUTHENTICATED ROUTES
================================ */

Router.post('/email/verify', userController.verifyUser);

Router.post('/email/password', userController.verifyResetPasswordMail);

module.exports = Router;
