'use strict';

// Importing Packages
const { Schema } = require('mongoose');
const User = require('../user/model');

// Upload files, history, blood reports, etc, medical related stuff

const patientSchema = new Schema({
	dateOfBirth: Date,
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
		enum: ['Male', 'Female', 'Other'],
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
	presentingComplaint: [
		{
			date: Date,
			complaint: String,
			duration: String,
		},
	],
	history: {
		comorbidity: [
			{
				date: Date,
				diabetic: {
					isDiabetic: Boolean,
					details: String,
				},
				hypertension: {
					isHypertension: Boolean,
					details: String,
				},
				heartDisease: {
					isHeartDisease: Boolean,
					details: String,
				},
				thyroidDisorders: {
					isThyroidDisorders: Boolean,
					details: String,
				},
				other: {
					details: String,
				},
			},
		],
		drug: [
			{
				date: Date,
				details: String,
			},
		],
		allergies: [
			{
				date: Date,
				details: String,
			},
		],
		family: [
			{
				date: Date,
				details: String,
			},
		],
		food: [
			{
				date: Date,
				details: String,
			},
		],
		sanitary: [
			{
				date: Date,
				details: String,
			},
		],
		occupation: [
			{
				date: Date,
				details: String,
			},
		],
		surgical: [
			{
				date: Date,
				details: String,
			},
		],
		pregnancy: [
			{
				date: Date,
				details: String,
			},
		],
		menstrual: [
			{
				date: Date,
				details: String,
			},
		],
		vasectomy: [
			{
				date: Date,
				details: String,
			},
		],
	},
});

patientSchema.methods.adminAccess = function ({ mode = '', options = {} }) {};

// Inheriting User Model as Admin
const Patient = User.discriminator('Patient', patientSchema);

// Exporting Model
module.exports = Patient;
