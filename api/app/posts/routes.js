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

Router.get('/all', postsController.fetchAllPosts);

Router.get('/:_id', postsController.fetchPost);

/* ================================
    AUTHENTICATED ROUTES
================================ */

Router.post('/create', postsController.createPost);

Router.patch('/edit', postsController.editPost);

Router.delete('/delete', postsController.deletePost);

module.exports = Router;
