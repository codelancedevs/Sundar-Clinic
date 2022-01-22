'use strict';

// Importing Router
const Router = require('express').Router();

// Importing All Routers
const routerHub = require('./routes');

// Using Router
Router.use('/', routerHub);

// Exporting Index Router
module.exports = Router;
