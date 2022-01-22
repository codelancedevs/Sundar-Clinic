'use strict';

// Importing Packages
const { Schema } = require('mongoose');
const User = require('../user/model');

// Upload files, history, blood reports, etc, medical related stuff

const patientSchema = new Schema({
	dateOfBirth: Date,
	dateOfDeath: Date,
	maritalStatus: {
		isMarried: Boolean,
		marriedTo: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	kidsDetails: {
		hasKids: Boolean,
		kids: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	},
	gender: {
		type: String,
		enum: ['Male', 'Female', 'Other', 'Prefer Not To Say'],
	},
	files: [
		{
			type: {
				type: String,
				enum: ['Blood Investigations', 'X-Ray', 'Urine Test', 'ECG'],
			},
			uploaded: Date,
			file: Buffer,
		},
	],
	history: {

	},
});

// Inheriting User Model as Admin
const Patient = User.discriminator('Patient', patientSchema);

// Exporting Model
module.exports = Patient;
