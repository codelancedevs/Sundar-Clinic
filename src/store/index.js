/**
 * Store Configuration.
 * Exports Store
 */

// Dependencies
import { configureStore } from '@reduxjs/toolkit';
import testReducer from '../features/test';

const store = configureStore({
	reducer: {
		test: testReducer,
	},
});

export default store;
