/**
 * Application Model
 */

'use strict';

// Dependencies
const { Schema, model } = require('mongoose');
const { isEmail, isURL, isMobilePhone } = require('validator');
const { reactAppUrl, appId } = require('../../helper/config');
const { createApp } = require('../../helper/functions');

const appSchema = new Schema(
	{
		owner: {
			name: String,
			clinic: {
				doctors: {
					type: Array,
					default: [
						{
							name: 'Dr. Ekta Bharti',
							degrees: ['M.B.B.S', 'General Physician'],
							registrationNo: '68812',
							role: 'Head Doctor'
						},
					],
				},
				address: {
					type: String,
					default:
						'1195A, Nehru Street, Bangalore-Chennai Highway, Pappanchatiram, Chennai, Tamil Nadu - 600123',
				},
				documents: [{}],
			},
		},
		site: {
			detail: {
				type: String,
				default: `© Sundar Clinic Est. since 2013`,
			},
			contact: {
				phone: {
					type: String,
					validate: [isMobilePhone, 'Requires a valid mobile number'],
					default: '8939881702',
				},
				email: {
					type: String,
					validate: [isEmail, 'Requires a valid Email'],
					default: 'sundarclinic@gmail.com',
				},
			},
			link: {
				type: String,
				validate: [isURL, 'Requires a valid URL'],
				default: reactAppUrl,
			},
			meta: {
				isOpenSource: {
					type: Boolean,
					default: false,
				},
			},
		},
		createdBy: {
			name: {
				type: String,
				default: `© Codelance Devs Est. since 2022`,
			},
			contact: {
				email: {
					type: String,
					validate: [isEmail, 'Requires a valid Email'],
					default: 'contact@codelancedevs.com',
				},
				website: {
					type: String,
					validate: [isURL, 'Requires a valid URL'],
					default: 'https://codelancedevs.com',
				},
			},
			github: {
				type: String,
				validate: [isURL, 'Requires a valid URL'],
				default: 'https://github.com/codelancedevs/Sundar-Clinic',
			},
			documentation: {
				type: String,
				validate: [isURL, 'Requires a valid URL'],
			},
		},
	},
	{
		timestamps: true,
		strict: true,
	}
);

const App = model('App', appSchema);

module.exports = App;

// Create Application Instance in Database if not created already.
createApp({ id: appId, App });
