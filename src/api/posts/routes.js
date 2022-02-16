/**
 * Posts Routes
 */

'use strict';

// Dependencies
const Router = require('express').Router();
const { authAdmin } = require('../../helper/middleware');
const postsController = require('./controller');

/* ================================
    UNAUTHENTICATED ROUTES
================================ */

Router.get('/', postsController.fetchPosts);

/* ================================
    AUTHENTICATED ROUTES
================================ */

Router.post('/', authAdmin, postsController.createNewPost);

Router.patch('/', authAdmin, postsController.editPost);

Router.delete('/', authAdmin, postsController.deletePost);

module.exports = Router;
