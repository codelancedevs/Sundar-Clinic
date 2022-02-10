/**
 * Store Configuration.
 * Exports Store
 */

// Dependencies
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user';
import testReducer from './features/test';

const store = configureStore({
	reducer: {
		user: userReducer,
		test: testReducer,
	},
});

export default store;
