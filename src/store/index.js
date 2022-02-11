/**
 * Store Configuration.
 * Exports Store
 */

// Dependencies
import { configureStore } from '@reduxjs/toolkit';

// Application Reducers
import rootReducer from './features/root';
import userReducer from './features/user';
import testReducer from './features/test';

const store = configureStore({
	reducer: {
		root: rootReducer,
		user: userReducer,
		test: testReducer,
	},
});

export default store;
