/**
 * Application Router Hub
 */

'use strict';

// Dependencies
const Router = require('express').Router();
const routerHub = require('./routes');

// Using Router
Router.use('/', routerHub);

// Exporting Index Router
module.exports = Router;
