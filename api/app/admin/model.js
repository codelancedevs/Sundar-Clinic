/**
 * Admin Model
 */

'use strict';

// Dependencies
const { Schema, model } = require('mongoose');
const User = require('../user/model');

// Creating Admin Schema
const adminSchema = new Schema({
    adminDetails: {
        isMedicalPersonal: Boolean,
        degrees: [],
        role: {
            type: String,
            enum: ['Manager', 'Medical Staff', 'Developer']
        },
        medicalStaffDetails: {
            registrationNo: String,
            role: {
                type: String,
                enum: ['Head Doctor', 'Intern', 'Nurse'],
            },
        },
    },
});

// Inheriting User Model as Admin
const Admin = User.discriminator('Admin', adminSchema);

// Exporting Model
module.exports = Admin;
