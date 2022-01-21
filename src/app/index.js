"use strict";

const Router = require("express").Router();

const routerHub = require("./routes");

Router.use("/api", routerHub);

module.exports = Router;