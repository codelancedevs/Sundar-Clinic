/**
 * Posts Controllers
 */

'use strict';

// Dependencies
const { isValidObjectId } = require('mongoose');
const Post = require('./model');

/* ================================
	UNAUTHENTICATED CONTROLLERS
================================ */

/**
 * @description Get all posts or a single post
 * @route GET /api/post?postId=<post id here>
 * @data If no data, all posts are fetched else if {postId} in Request Query, it will fetch that post
 * @access Public
 */
exports.fetchPosts = async (req, res) => {
	// Collecting Required data from Request Query
	const { postId: _id } = req.query;
	try {
		// Posts Container
		const posts = [];
		// Checking type of Request
		if (_id) {
			if (!isValidObjectId(_id)) throw new Error('Invalid Post Id');
			const post = await Post.findById(_id)
				.populate('createdBy')
				.populate('lastEditedBy');
			if (!post) throw new Error('Unable to find post');
			const postData = post.toObject();
			postData.createdBy = post.createdBy.fullName;
			postData.lastEditedBy = post.lastEditedBy.fullName;
			posts.push(postData);
		} else {
			const allPosts = await Post.find()
				.populate('createdBy')
				.populate('lastEditedBy');

			if (!allPosts) throw new Error('No Posts Created');
			allPosts.forEach((post) => {
				const postData = post.toObject();
				postData.createdBy = post.createdBy.fullName;
				postData.lastEditedBy = post.lastEditedBy.fullName;
				posts.push(postData);
			});
		}

		return res.status(200).json({
			message: 'Fetched Post/s Successfully',
			data: {
				posts,
			},
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({ message: error.message, data: {}, success: false });
	}
};

/* ================================
	AUTHENTICATED CONTROLLERS
================================ */
/**
 * @description Create a new Post and Return Id
 * @route POST /api/post/
 * @data No data required
 * @access Admin
 */
exports.createNewPost = async (req, res) => {
	// Collecting Required Data from Middleware
	const { _id } = req.admin;
	try {
		// Creating New Post and saving
		const newPost = new Post({ createdBy: _id, lastEditedBy: _id });
		await newPost.save();

		const post = await Post.findById({ _id: newPost._id.toString() })
			.populate('createdBy')
			.populate('lastEditedBy');

		const postData = post.toObject();
		postData.createdBy = post.createdBy.fullName;
		postData.lastEditedBy = post.lastEditedBy.fullName;

		// Response after creating Post with Post Id
		return res.status(200).json({
			message: 'Post Created Successfully',
			data: {
				post: postData,
			},
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({ message: error.message, data: {}, success: false });
	}
};

/**
 * @description Edit Post
 * @route PATCH /api/post/
 * @data {title, body, type, _id, isPublished} : 'String' of post in Request body
 * @access Admins
 */
exports.editPost = async (req, res) => {
	// Collecting Required Data from Request Body and Middleware
	const { _id: adminId } = req.admin;
	let { title, body, type, _id, isPublished } = req.body;
	try {
		// Type Check
		_id = typeof _id === 'string' ? _id : false;
		if (!_id)
			throw new Error(
				"{title, body, type, isPublished, _id} : 'String' is required in Request body"
			);
		if (!isValidObjectId(_id)) throw new Error('Invalid Post Id');

		isPublished = typeof isPublished === 'boolean' ? isPublished : false;

		// Find Post
		const post = await Post.findById(_id)
			.populate('createdBy')
			.populate('lastEditedBy');
		if (!post) throw new Error('Unable to Find Post');

		// Updating Post details
		// If data is not there, update with Previous values
		const details = {
			title: title || post.title,
			body: body || post.body,
			type: type || post.boyd,
			lastEditedBy: adminId,
		};
		if (isPublished) {
			details.isPublished = isPublished;
			details.publishedAt = Date.now();
		} else {
			details.publishedAt = null;
		}

		// Update Post
		await post.updateOne({ ...details });

		const postData = post.toObject();
		postData.createdBy = post.createdBy.fullName;
		postData.lastEditedBy = post.lastEditedBy.fullName;

		// Response after successfully updating post
		return res.status(200).json({
			message: 'Post Edited Successfully',
			data: {
				post: postData,
			},
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({ message: error.message, data: {}, success: false });
	}
};

/**
 * @description Delete Post
 * @route DELETE /api/post
 * @data {_id} : 'String' in Request Body
 * @access Admin
 */
exports.deletePost = async (req, res) => {
	// Collecting Required Data from Request Body
	let { _id } = req.body;
	try {
		// Type Checks
		_id = typeof _id === 'string' ? _id : false;
		if (!_id)
			throw new Error("{_id} : 'String' is required in Request body");
		if (!isValidObjectId(_id)) throw new Error('Invalid Post Id');

		// Finding Post
		const post = await Post.findById(_id);
		if (!post) throw new Error('Unable to find Post');

		// Deleting Post
		await post.delete();

		// Response after Deleting Post Successfully
		return res.status(200).json({
			message: 'Post Deleted Successfully',
			data: {},
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.json({ message: error.message, data: {}, success: false });
	}
};
