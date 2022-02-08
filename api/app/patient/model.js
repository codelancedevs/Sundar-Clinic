/**
 * Patient Model
 */

'use strict';

// Dependencies
const { Schema, now } = require('mongoose');
const User = require('../user/model');

// Upload files, history, blood reports, etc, medical related stuff

const patientSchema = new Schema({
	doctorAssigned: String,
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

patientSchema.statics.updateHistoryDetails = async function ({
	historyFor = '',
	_id = '',
	details = {},
}) {
	// Type Checks
	_id = typeof _id === 'string' ? _id : false;
	historyFor = typeof historyFor === 'string' ? historyFor : false;
	details = typeof details === 'object' ? details : false;

	if (!_id || !details || !historyFor)
		throw new Error(
			"{historyFor: 'String', _id : 'String', details: 'Object'} are missing or invalid"
		);

	// Getting the specific patient
	const patient = await Patient.findById(_id);
	if (!patient) throw new Error('Unable to find patient');

	// Updating details for Current date.
	details.date = Date.now();

	// Updating History for specified case;
	switch (historyFor) {
		case 'comorbidity': {
			patient.updateOne({ 'history.comorbidity': { ...details } });
			break;
		}
		case 'drug': {
			patient.updateOne({ 'history.drug': { ...details } });
			break;
		}
		case 'allergies': {
			patient.updateOne({ 'history.allergies': { ...details } });
			break;
		}
		case 'family': {
			patient.updateOne({ 'history.family': { ...details } });
			break;
		}
		case 'food': {
			patient.updateOne({ 'history.food': { ...details } });
			break;
		}
		case 'sanitary': {
			patient.updateOne({ 'history.sanitary': { ...details } });
			break;
		}
		case 'occupation': {
			patient.updateOne({ 'history.occupation': { ...details } });
			break;
		}
		case 'surgical': {
			patient.updateOne({ 'history.surgical': { ...details } });
			break;
		}
		case 'pregnancy': {
			patient.updateOne({ 'history.pregnancy': { ...details } });
			break;
		}
		case 'menstrual': {
			patient.updateOne({ 'history.menstrual': { ...details } });
			break;
		}
		case 'vasectomy': {
			patient.updateOne({ 'history.vasectomy': { ...details } });
			break;
		}
		default: {
			throw new Error(
				"{historyFor: 'String'} should be a valid history key."
			);
		}
	}
};

// Inheriting User Model as Admin
const Patient = User.discriminator('Patient', patientSchema);

// Exporting Model
module.exports = Patient;
