/**
 * App Configuration
 */

// Checking Environment
const isProduction = process.env.NODE_ENV === 'production';

// Setting Backend Url
const backendUrl = isProduction
	? process.env.REACT_APP_BACKEND_URL
	: 'http://localhost:8000';

// Configuration Container
const configuration = {
	isProduction,
	backendUrl,
};

export default configuration;
