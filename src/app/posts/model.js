'use strict';

const { Schema, model } = require('mongoose');

const postsSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			minLength: [10, 'Min 10 characters required for title'],
			maxLength: [100, 'Title Cannot cross 100 Characters'],
		},
		body: {
			type: String,
			required: true,
			trim: true,
		},
		coverImage: {
			type: String,
		},
		type: {
			type: String,
			enum: [
				'Job Opening',
				'Offer',
				'New Service',
				'General',
				'Emergency',
			],
			default: 'General',
		},
		isPublished: Boolean,
		publishedAt: Date,
	},
	{
		timestamps: true,
		strict: true,
	}
);

const Posts = model('Posts', postsSchema);

module.exports = Posts;
