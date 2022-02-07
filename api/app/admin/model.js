/**
 * Admin Model
 */

'use strict';

// Dependencies
const { Schema, model } = require('mongoose');
const User = require('../user/model');

// Creating Admin Schema
const adminSchema = new Schema({});

// Inheriting User Model as Admin
const Admin = User.discriminator('Admin', adminSchema);

// Exporting Model
module.exports = Admin;
