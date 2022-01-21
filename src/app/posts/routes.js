"use strict";

// Importing Packages
const Router = require('express').Router();
const { authAdmin } = require('../../helper/middleware');
const postsController = require("./controller");

module.exports = Router;