/**
 * Patient Model
 */

'use strict';

// Dependencies
const { Schema, now } = require('mongoose');
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
			_id: false,
			date: Date,
			complaint: String,
			duration: String,
		},
	],
	history: {
		comorbidity: [
			{
				_id: false,
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
				_id: false,
				date: Date,
				details: String,
			},
		],
		allergies: [
			{
				_id: false,
				date: Date,
				details: String,
			},
		],
		family: [
			{
				_id: false,
				date: Date,
				details: String,
			},
		],
		food: [
			{
				_id: false,
				date: Date,
				details: String,
			},
		],
		sanitary: [
			{
				_id: false,
				date: Date,
				details: String,
			},
		],
		occupation: [
			{
				_id: false,
				date: Date,
				details: String,
			},
		],
		surgical: [
			{
				_id: false,
				date: Date,
				details: String,
			},
		],
		pregnancy: [
			{
				_id: false,
				date: Date,
				details: String,
			},
		],
		menstrual: [
			{
				_id: false,
				date: Date,
				details: String,
			},
		],
		vasectomy: [
			{
				_id: false,
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

	const historyKeys = [
		'comorbidity',
		'drug',
		'allergies',
		'family',
		'food',
		'sanitary',
		'occupation',
		'surgical',
		'pregnancy',
		'menstrual',
		'vasectomy',
	];

	if (!historyKeys.includes(historyFor))
		throw new Error(
			`History key is wrong, should include ${historyKeys.join(', ')}`
		);

	// Updating details for Current date.
	details.date = Date.now();

	await patient.updateOne({
		$push: { [`history.${historyFor}`]: { ...details } },
	});
};

patientSchema.statics.getAllPatients = async function () {
	const patients = await Patient.find().select({
		history: 0,
		password: 0,
		address: 0,
		maritalStatus: 0,
		kidsDetails: 0,
		files: 0,
		isVerified: 0,
		tosAgreement: 0,
	});
	return patients;
};

// Inheriting User Model as Admin
const Patient = User.discriminator('Patient', patientSchema);

// Exporting Model
module.exports = Patient;
