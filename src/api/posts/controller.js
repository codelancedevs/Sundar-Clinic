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
exports.fetchPosts = async (req, res, next) => {
	// Collecting Required data from Request Query
	const { postId: _id = '' } = req.query;
	try {
		// Posts Container
		const posts = [];

		// Checking type of Request
		const query = {
			_id: _id,
		};
		isValidObjectId(_id) ? null : delete query._id;
		// Cache for all Posts

		Post.find(query)
			.then((allPosts) => {
				posts.push(...allPosts);

				return res.status(200).json({
					message: 'Fetched Post/s Successfully',
					data: {
						posts,
					},
					success: true,
				});
			})
			.catch(next);
	} catch (error) {
		return next(error);
	}
};

/* ================================
	AUTHENTICATED CONTROLLERS
================================ */
/**
 * @description Create a new Post and Return Id
 * @route POST /api/post
 * @data No data required
 * @access Admin
 */
exports.createNewPost = async (req, res, next) => {
	// Collecting Required Data from Middleware
	const { _id } = req.admin;
	try {
		// Creating New Post and saving
		const newPost = new Post({ createdBy: _id, lastEditedBy: _id });
		newPost
			.save()
			.then((post) => {
				// Response after creating Post with Post Id
				return res.status(200).json({
					message: 'Post Created Successfully',
					data: {
						post: post.toObject(),
					},
					success: true,
				});
			})
			.catch(next);
	} catch (error) {
		return next(error);
	}
};

/**
 * @description Edit Post
 * @route PATCH /api/post/
 * @data {title, body, type, _id, isPublished} : 'String' of post in Request body
 * @access Admins
 */
exports.editPost = async (req, res, next) => {
	// Collecting Required Data from Request Body and Middleware
	const { _id: adminId } = req.admin;
	let { title, body, type, _id, isPublished } = req.body;
	try {
		// Type Check
		_id = typeof _id === 'string' && isValidObjectId(_id) ? _id : false;
		if (!_id)
			throw new Error(
				"{title, body, type, isPublished, _id} : 'String' is required in Request body"
			);

		isPublished = typeof isPublished === 'boolean' ? isPublished : false;

		// Find Post
		Post.findById(_id)
			.then((post) => {
				if (!post) throw new Error('Unable to Find Post');

				// Updating Post details
				// If data is not there, update with Previous values
				const details = {
					title: title || post.title,
					body: body || post.body,
					type: type || post.type,
					lastEditedBy: adminId,
				};

				if (isPublished) {
					details.isPublished = isPublished;
					details.publishedAt = Date.now();
				} else {
					details.publishedAt = null;
				}

				// Update Post
				post.assignCoverImage();
				post.updateOne({
					...details,
					coverImage: post.coverImage,
				})
					.then(() => {
						// Response after successfully updating post
						return res.status(200).json({
							message: 'Post Edited Successfully',
							data: {
								post: { ...post.toObject(), ...details },
							},
							success: true,
						});
					})
					.catch(next);
			})
			.catch(next);
	} catch (error) {
		return next(error);
	}
};

/**
 * @description Delete Post
 * @route DELETE /api/post
 * @data {_id} : 'String' in Request Body
 * @access Admin
 */
exports.deletePost = (req, res, next) => {
	// Collecting Required Data from Request Body
	let { _id } = req.body;
	try {
		// Type Checks
		_id = typeof _id === 'string' && isValidObjectId(_id) ? _id : false;
		if (!_id)
			throw new Error(
				"{_id} : 'String' is required in Request body or is invalid"
			);

		// Finding Post
		Post.findByIdAndDelete(_id)
			.then((post) => {
				console.log(post);
				if (!post) throw new Error('Unable to find Post');
				// Response after Deleting Post Successfully
				return res.status(200).json({
					message: 'Post Deleted Successfully',
					data: {},
					success: true,
				});
			})
			.catch(next);
	} catch (error) {
		return next(error);
	}
};
