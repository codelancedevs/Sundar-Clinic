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
            enum: {
                values: ['Manager', 'Medical Staff', 'Developer'],
                message: '{VALUE} is an invalid admin role'
            },
        },
        medicalStaffDetails: {
            registrationNo: String,
            role: {
                type: String,
                enum: {
                    values: ['Head Doctor', 'Intern', 'Nurse'],
                    message: '{VALUE} is an invalid medical staff role'
                },
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
