/**
 * Posts Controllers
 */

'use strict';

// Dependencies
const Post = require('./model');

/* ================================
    UNAUTHENTICATED CONTROLLERS
================================ */

exports.fetchAllPosts = async (req, res) => {};

exports.fetchPost = async (req, res) => {};

/* ================================
    AUTHENTICATED CONTROLLERS
================================ */

/** 
* @description Create a new Post
* @route POST /api/post/create
* @data {title, body, type} of post in the Request Body
* @access Only Admin
*/
exports.createPost = async (req, res) => {
	const { _id } = req.admin;
	const { title, body, type } = req.body;
	try {
		// TODO: Error handling here
		const post = new Post({ title, body, type, createdBy: _id, lastEditedBy: _id });
		await post.save();
		return res.status(200).json({
			message: 'Post Successfully Created',
			data: {
				post: post.toObject(),
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
* @route PATCH /api/post/edit
* @data {title, body, type, _id} of post in Request body
* @access Only Admins
*/
exports.editPost = async (req, res) => {
	const { _id: adminId } = req.admin;
	const { title, body, type, _id } = req.body;
	try {
		// TODO: Error Handling here
		const post = await Post.findById(_id);
		if (!post) throw new Error('Unable to Find Post');
		await post.update({ title, body, type, lastEditedBy: adminId });
		return res.status(200).json({
			message: 'Post Edited Successfully',
			data: {
				post: post.toObject(),
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
* @description <Controller description here>
* @route METHOD <Route>
* @data <Data either in body, params, or query>
* @access <Access Level>
*/
exports.deletePost = async (req, res) => {
	const { _id: adminId } = req.admin;
	const { _id } = req.body;
	try {
        // TODO: Error Handling here
        const post = await Post.findById(_id);
        if(!post) throw new Error("Unable to find Post");
        await post.delete();
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
