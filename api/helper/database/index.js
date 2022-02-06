'use strict';

const mongoose = require('mongoose');
const { mongoDb: { connectionUri} } = require('../config');

const connectToDatabase = async () => {
	try {
		await mongoose.connect(connectionUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected to Database!');
	} catch (error) {
		console.log(error);
	}
};

await connectToDatabase();
