/**
 * Store Configuration.
 * Exports Store
 */

// Dependencies
import { configureStore } from '@reduxjs/toolkit';

// Application Reducers
import appReducer from './features/app';
import userReducer from './features/user';
import testReducer from './features/test';

const store = configureStore({
	reducer: {
		app: appReducer,
		user: userReducer,
		test: testReducer,
	},
});

export default store;
