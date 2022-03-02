/**
 * Posts Model
 */

'use strict';

// Dependencies
const { Schema, model } = require('mongoose');
const { backendAppUrl } = require('../../helper/config');
const {isURL} = require('validator')

// Creating Posts schema
const postsSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			minLength: [10, 'Title should be minimum 10 Characters, got {VALUE}'],
			maxLength: [100, 'Title Cannot cross 100 Characters, got {VALUE}'],
		},
		body: {
			type: String,
			trim: true,
		},
		coverImage: {
			type: String,
			validate: [isURL, '{VALUE} is not a supported cover image']
		},
		type: {
			type: String,
			enum: {
				values: ['Job', 'Offer', 'Service', 'General', 'Emergency'],
				message: '{VALUE} is not a valid post type'
			},
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

// Assign a default cover Image depending on the type of the post
postsSchema.methods.assignCoverImage = function () {
	const type = this.type;
	const consistsMultipleImages = type === 'General' || type === 'Service';
	if (consistsMultipleImages) {
		this.coverImage = `${backendAppUrl}/assets/post/${type}${Math.ceil(
			Math.random() * 2
		)}.gif`;
		return;
	}
	this.coverImage = `${backendAppUrl}/assets/post/${type}.gif`;
};

// Populate the Posts with the name of the admin who created and last edited it
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

// Assign Cover Image before Saving
postsSchema.pre('save', async function (next) {
	await this.assignCoverImage();
	next();
});

// Creating Model from Schema
const Posts = model('Posts', postsSchema);

// Exporting Model
module.exports = Posts;
