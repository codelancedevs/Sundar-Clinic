/**
 * Patient Model
 */

'use strict';

// Dependencies
const { Schema, isValidObjectId } = require('mongoose');
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
		enum: {
			values: ['Male', 'Female', 'Other'],
			message: '{VALUE} is not a valid gender'
		},
	},
	// files: [
	// 	{
	// 		type: {
	// 			type: String,
	// 			enum: ['Blood Investigations', 'X-Ray', 'Urine Test', 'ECG'],
	// 		},
	// 		uploaded: Date,
	// 		file: Buffer,
	// 	},
	// ],
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

/**
 * @description Adds new Presenting Complaint
 * @param {string} _id Patient Id 
 * @param {object} presentingComplaint 
 * @returns {Promise<object>} Updated presenting complaint object with additional details
 */
patientSchema.statics.updatePresentingComplaint = async function ({
	_id = '',
	presentingComplaint = {},
}) {
	// Type Checks
	_id = typeof _id === 'string' && isValidObjectId(_id) ? _id : false;
	presentingComplaint =
		typeof presentingComplaint === 'object' &&
			presentingComplaint?.complaint
			? presentingComplaint
			: false;

	if (!_id || !presentingComplaint)
		throw new Error(
			"{_id : 'String', presentingComplaint: 'Object'} are missing or invalid"
		);

	// Getting the specific patient
	const patient = await Patient.findById(_id);
	if (!patient) throw new Error('Unable to find patient');

	// Updating details for Current date.
	presentingComplaint.date = Date.now();

	// Add New details
	patient.presentingComplaint.push({ ...presentingComplaint });
	const updatedPatient = await patient.save();

	// Returning New Presenting Complaint
	const newPresentingComplaint = updatedPatient.presentingComplaint
		.filter((complaint) => {
			// Convert to milliseconds to compare
			const complaintDate = new Date(complaint.date).getTime();
			return complaintDate === presentingComplaint.date;
		})[0]
		.toObject();

	return newPresentingComplaint;
};

/**
 * @description Edit Presenting Complaint
 * @param {string} patientId 
 * @param {string} _id Id of Presenting Complaint to be updated
 * @param {object} presentingComplaint details of the presenting complaint
 */
patientSchema.statics.editPresentingComplaint = async function ({
	patientId = '',
	_id = '',
	presentingComplaint = {},
}) {
	// Type Checks
	patientId =
		typeof patientId === 'string' && isValidObjectId(patientId)
			? patientId
			: false;
	_id = typeof _id === 'string' && isValidObjectId(_id) ? _id : false;
	presentingComplaint =
		typeof presentingComplaint === 'object' &&
			presentingComplaint?.complaint
			? presentingComplaint
			: false;

	if (!_id || !presentingComplaint || !patientId)
		throw new Error(
			"{_id : 'String', patientId: 'String', presentingComplaint: 'Object'} are missing or invalid"
		);

	// Finding Patient
	const patient = await Patient.findById({ _id: patientId });
	if (!patient) throw new Error('Unable to find Patient');

	// Getting Presenting Complaint Details
	const patientPresentingComplaint = patient.presentingComplaint.id(_id);

	// Checking if Presenting Complaint exists
	if (!patientPresentingComplaint)
		throw new Error('Given Presenting Complaint Id does not exist');

	// Updating and saving edited Presenting Complaint
	patient.presentingComplaint.id(_id).complaint =
		presentingComplaint.complaint;
	patient.presentingComplaint.id(_id).duration = presentingComplaint.duration;
	await patient.save();
};

/**
 * @description Delete Presenting Complaint
 * @param {string} patientId
 * @param {string} _id Presenting complaint id 
 */
patientSchema.statics.deletePresentingComplaint = async function ({
	patientId = '',
	_id = '',
}) {
	// Type Checks
	patientId =
		typeof patientId === 'string' && isValidObjectId(patientId)
			? patientId
			: false;
	_id = typeof _id === 'string' && isValidObjectId(_id) ? _id : false;
	if (!_id || !patientId) {
		throw new Error(
			"{_id, patientId} : 'String' of Presenting Complaint should be there in Request body or is invalid"
		);
	}

	// Finding Patient
	const patient = await Patient.findOne({ _id: patientId });
	if (!patient) throw new Error('Unable to find Patient');

	// Deleting Presenting Complaint
	const presentingComplaint = patient.presentingComplaint.id(_id);
	if (!presentingComplaint)
		throw new Error('Given Presenting Complaint Id does not exist');
	presentingComplaint.remove();
	await patient.save();
};

/**
 * @description Adds new History for the given details
 * @param {string} historyFor Which History needs to be updated
 * @param {string} _id Id of Patient
 * @param {object} details Details associated with that history
 * @returns {Promise<object>} Updated History Object
 */
patientSchema.statics.updateHistoryDetails = async function ({
	historyFor = '',
	_id = '',
	details = {},
}) {
	// Type Checks
	_id = typeof _id === 'string' && isValidObjectId(_id) ? _id : false;
	historyFor = typeof historyFor === 'string' ? historyFor : false;
	details = typeof details === 'object' ? details : false;

	if (!_id || !details || !historyFor)
		throw new Error(
			"{historyFor: 'String', _id : 'String', details: 'Object'} are missing or invalid"
		);

		validateHistoryKey(historyFor);

	// Getting the specific patient
	const patient = await Patient.findById(_id);
	if (!patient) throw new Error('Unable to find patient');

	// Updating details for Current date.
	details.date = Date.now();

	// Add New details
	patient.history[`${historyFor}`].push({ ...details });
	const updatedPatient = await patient.save();

	// Returning New History
	const newHistory = updatedPatient.history[`${historyFor}`]
		.filter((history) => {
			// Convert to milliseconds to compare
			const historyDate = new Date(history.date).getTime();
			return historyDate === details.date;
		})[0]
		.toObject();

	return newHistory;
};

/**
 * @description Edit Patient History Details
 * @param {string} historyFor Which History needs to be updated 
 * @param {string} patientId 
 * @param {string} _id Id of the History object
 * @param {object} details Details that needs to be updated 
 */
patientSchema.statics.editHistoryDetails = async function ({
	historyFor = '',
	patientId = '',
	_id = '',
	details = {},
}) {
	// Type Checks
	_id = typeof _id === 'string' ? _id : false;
	patientId = typeof patientId === 'string' ? patientId : false;
	historyFor = typeof historyFor === 'string' ? historyFor : false;
	details = typeof details === 'object' ? details : false;

	if (!_id || !details || !historyFor || !patientId)
		throw new Error(
			"{historyFor: 'String', _id : 'String', patientId: 'String', details: 'Object'} are missing or invalid"
		);
	if (!isValidObjectId(patientId)) throw new Error('Invalid Patient Id');
	if (!isValidObjectId(_id)) throw new Error('Invalid History Id');

	validateHistoryKey(historyFor);

	// Finding Patient
	const patient = await Patient.findById({ _id: patientId });
	if (!patient) throw new Error('Unable to find Patient');

	// Finding Specific History Details from Patient
	const history = patient.history[`${historyFor}`].id(_id);

	if (!history) throw new Error('Given History Id does not exist');

	// Updating and saving history
	history.details = details.details;
	await patient.save();
};

/**
 * @description Delete Patient History Details
 * @param {string} historyFor Which History needs to be deleted 
 * @param {string} patientId 
 * @param {string} _id Id of the History object
 */
patientSchema.statics.deleteHistoryDetails = async function ({
	historyFor = '',
	patientId = '',
	_id = '',
}) {
	// Type Checks
	_id = typeof _id === 'string' ? _id : false;
	patientId = typeof patientId === 'string' ? patientId : false;
	historyFor = typeof historyFor === 'string' ? historyFor : false;

	if (!_id || !historyFor || !patientId)
		throw new Error(
			"{historyFor: 'String', _id : 'String', patientId: 'String'} are missing or invalid"
		);
	if (!isValidObjectId(patientId)) throw new Error('Invalid Patient Id');
	if (!isValidObjectId(_id)) throw new Error('Invalid History Id');

	validateHistoryKey(historyFor);

	// Finding Patient 
	const patient = await Patient.findOne({ _id: patientId });
	if (!patient) throw new Error('Unable to find Patient');

	const history = patient.history[`${historyFor}`].id(_id);
	if (!history) throw new Error('Given History Id does not exist');
	history.remove();
	await patient.save();
};

// Get all patients with required data
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

// Custom Validation Function
function validateHistoryKey(key) {
	const HISTORY_KEYS = [
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

	if (!HISTORY_KEYS.includes(key))
		throw new Error(
			`History key is wrong, should include ${HISTORY_KEYS.join(', ')}`
		);
}
