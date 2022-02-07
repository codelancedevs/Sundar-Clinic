/**
 * Admin Hub
 */

'use strict';

// Dependencies
const Router = require('express').Router();
const adminRouter = require('./routes');

Router.use(adminRouter);

module.exports = Router;
