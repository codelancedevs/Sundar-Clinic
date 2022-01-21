'use strict';

// Importing Packages
const { Schema } = require('mongoose');
const User = require('../user/model');

const patientSchema = new Schema({
	dateOfBirth: Date,
	maritalStatus: {
		isMarried: Boolean,
		marriedTo: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	history: {
		
	}
});

// Inheriting User Model as Admin
const Patient = User.discriminator('Patient', patientSchema);

// Exporting Model
module.exports = Patient;
