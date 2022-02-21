/**
 * User Model
 */

'use strict';

// Dependencies
const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isEmail, isMobilePhone, isStrongPassword } = require('validator');
const {
	secrets: { saltRounds, adminSecret, patientSecret },
	expireDurations: { tokenExpireAt },
} = require('../../helper/config');
const {sendWelcomeAndVerifyAccountEmail} = require('../../helper/mail')

const userSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: 'Password is Required',
			validate: [isStrongPassword, 'Please Enter a strong password'],
		},
		username: {
			type: String,
			trim: true,
			unique: true,
			lowercase: true,
		},
		email: {
			type: String,
			required: 'Email Address is Required',
			validate: [isEmail, 'Please Enter a valid Email Address'],
			trim: true,
			unique: true,
			lowercase: true,
		},
		phone: {
			type: String,
			trim: true,
			validate: [isMobilePhone, 'Please Enter a valid Phone Number'],
		},
		defaultAvatar: {
			type: String,
		},
		avatar: {
			type: String,
		},
		address: {
			type: String,
			trim: true,
		},
		verification: {
			isVerified: {
				type: Boolean,
				default: false,
			},
			verifiedAt: Date,
		},
		tosAgreement: {
			type: Boolean,
		},
	},
	{
		timestamps: true,
		strict: true,
		discriminatorKey: 'role',
	}
);

// Update User Instance password to hashed password
userSchema.methods.generateHashedPassword = async function () {
	this.password = await bcrypt.hash(this.password, saltRounds);
};

/**
 * @description Return a hashed password
 * @param {string} password Password that needs to be hashed  
 * @returns {Promise<string>} Hashed Password
 */
userSchema.methods.returnHashedPassword = async function ({ password = '' }) {
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	return hashedPassword;
};

// Create a default avatar for User Instance
userSchema.methods.createDefaultAvatar = async function () {
	const userInitials = this.fullName
		.split(' ')
		.map((word) => word.charAt(0))
		.join('');
	this.defaultAvatar = `https://avatars.dicebear.com/api/initials/${userInitials}.svg`;
};

// Get JWT Token for a particular User Instance
userSchema.methods.generateAuthToken = function () {
	const secret = this.role === 'Admin' ? adminSecret : patientSecret;
	const token = jwt.sign({ _id: this._id.toString() }, secret, {
		expiresIn: tokenExpireAt,
	});
	return token;
};

// Create a default username from User Instance's email
userSchema.methods.generateDefaultUsername = async function () {
	let username = this.email.split('@')[0];
	try {
		const usernameExists = await User.findOne({ username });
		if (!usernameExists) {
			this.username = username;
			return;
		}
		let [existingUsername, number] = usernameExists.username.split('-');
		number = !number ? '1' : parseInt(number, 10) + 1;
		this.username = `${existingUsername}-${number}`;
	} catch (error) {
		console.log(error);
	}
};

/**
 * @description Authenticate a user's password
 * @param {string} password Password that needs to be authenticated 
 * @returns {Promise<boolean>} true (if valid) || false (if invalid)
 */
userSchema.methods.authenticatePassword = function ({ password }) {
	try {
		const isUserPassword = bcrypt.compareSync(password, this.password);
		return isUserPassword;
	} catch (error) {
		console.log(error);
	}
};

// Sanitize User Details
userSchema.methods.sanitizeAndReturnUser = function () {
	const user = this.toObject();
	delete user.password;
	delete user.__v;
	return user;
};

// Create a random Password for the user
userSchema.statics.createRandomPassword = function ({ fullName = '' }) {
	const password = `${fullName.split(' ').join('')}@${Math.floor(
		Math.random() * fullName.length
	)}`;
	return password;
};

/**
 * @description Authenticate a User Token using Model Method
 * @param {string} token 
 * @returns {Promise<object>} User Object
 */
userSchema.statics.authenticateAdminAuthToken = async function ({ token }) {
	const secret = this.role === 'admin' ? adminSecret : patientSecret;
	let user;
	try {
		user = await jwt.verify(token, secret, async (err, decoded) => {
			if (err) throw err;
			user = await this.findById(decoded._id);
			if (!user) console.log('Unable to Find User');
			return user;
		});
		return user;
	} catch (error) {
		console.log(error);
	}
};

// Hooks, Do certain functions before saving user
userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		await this.generateHashedPassword();
		await this.createDefaultAvatar();
		await this.generateDefaultUsername();
		// Send the User Welcome and Verify Upon Account Creation
		sendWelcomeAndVerifyAccountEmail({
			_id: this._id.toString(),
			fullName: this.fullName,
			to: this.email,
		});
	}
	next();
});

const User = model('User', userSchema);

module.exports = User;
