/**
 * Posts Model
 */

'use strict';

// Dependencies
const { Schema, model } = require('mongoose');

// Creating Posts schema
const postsSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			minLength: [10, 'Min 10 characters required for title'],
			maxLength: [100, 'Title Cannot cross 100 Characters'],
		},
		body: {
			type: String,
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
		isPublished: {
			type: Boolean,
			default: false,
		},
		publishedAt: Date,
		createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
		lastEditedBy: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	{
		timestamps: true,
		strict: true,
	}
);

postsSchema.pre('find', function (next) {
	if (this.options._recursed) {
		return next();
	}
	this.populate({
		path: 'createdBy lastEditedBy',
		select: 'fullName',
		options: { _recursed: true },
	});
	next();
});

// Creating Model from Schema
const Posts = model('Posts', postsSchema);

// Exporting Model
module.exports = Posts;