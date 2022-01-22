'use strict';

// Importing Packages
const Router = require('express').Router();
const postsRouter = require('./routes');

Router.use(postsRouter);

module.exports = Router;
