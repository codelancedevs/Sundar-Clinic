/**
 * User Actions and Reducers
 */

import { createSlice } from '@reduxjs/toolkit';

const user = {
	fullName: '',
	username: '',
	email: '',
	phone: '',
	defaultAvatar: '',
	avatar: '',
	role: '',
	address: '',
	dateOfBirth: '',
	maritalStatus: {
		isMarried: false,
		marriedTo: '',
	},
	kidsDetails: {
		hasKids: false,
		kids: [],
	},
	presentingComplaint: [],
	history: {
		comorbidity: [],
		drug: [],
		allergies: [],
		family: [],
		food: [],
		sanitary: [],
		surgical: [],
		pregnancy: [],
		menstrual: [],
		vasectomy: [],
	},
	isVerified: false,
	tosAgreement: false,
	createdAt: '',
	updatedAt: '',
};

const getUserState = () => {
	if (localStorage.getItem('user')) {
		const userObj = JSON.parse(localStorage.getItem('user'));
		return userObj;
	} else {
		return user;
	}
};

const initialState = {
	value: {
		loggedIn: localStorage.getItem('loggedIn')
			? JSON.parse(localStorage.getItem('loggedIn'))
			: false,
		user: getUserState(),
	},
};

export const userSplice = createSlice({
	name: 'user',
	initialState,
	reducer: {
		login: (state, action) => {
			state.value.user = action.payload.user;
			const loggedIn = {
				token: action.payload.token,
				loggedInAs: action.payload.loggedInAs,
			};
			localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
			localStorage.setItem('user', JSON.stringify(state.value.user));
			state.value.loggedIn = loggedIn;
		},
		logout: (state, action) => {
			state.value.loggedIn = false;
			state.value.user = { ...user };
			localStorage.removeItem('loggedIn');
			localStorage.removeItem('user');
		},
	},
});

// Exporting Actions
export const { register, login, logout } = userSplice.actions;

// Exporting Reducer
export default userSplice.reducer;
