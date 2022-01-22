'use strict';

const Router = require('express').Router();
const adminRouter = require('./routes');

Router.use(adminRouter);

module.exports = Router;
