/**
 * Admin Model
 */

'use strict';

// Dependencies
const { Schema } = require('mongoose');
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

adminSchema.statics.getAllAdmins = async function () {
	const admins = await Admin.find().select({
		password: 0,
	});
	return admins;
};

// Inheriting User Model as Admin
const Admin = User.discriminator('Admin', adminSchema);

// Exporting Model
module.exports = Admin;
