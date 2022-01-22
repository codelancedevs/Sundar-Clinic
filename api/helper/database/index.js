'use strict';

const mongoose = require('mongoose');
const { isProduction, mongoDb } = require('../config');

const connectionUri = isProduction
	? mongoDb.productionUri
	: mongoDb.developmentUri;

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

connectToDatabase();
