'use strict';

const Router = require('express').Router();
const adminRouter = require('./routes');

Router.use('/admin', adminRouter);

module.exports = Router;
