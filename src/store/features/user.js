/**
 * User Actions and Reducers
 */

import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
	loggedIn: localStorage.getItem('loggedIn')
		? JSON.parse(localStorage.getItem('loggedIn'))
		: false,
	user: {
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
	},
};

export const userSplice = createSlice({
	name: 'user',
	initialState: { value: initialStateValue },
	reducer: {
		login: (state, action) => {
			state.value.user = action.payload.user;
			localStorage.setItem(
				'loggedIn',
				JSON.stringify({
					token: action.payload.token,
					loggedInAs: action.payload.loggedInAs,
				})
			);
			state.value.loggedIn = {
				token: action.payload.token,
				loggedInAs: action.payload.loggedInAs,
			};
		},
		logout: (state, action) => {
			state.value.loggedIn = false;
			state.value.user = { ...initialStateValue.user };
			localStorage.removeItem('loggedIn');
		},
	},
});

// Exporting Actions
export const { register, login, logout } = userSplice.actions;

// Exporting Reducer
export default userSplice.reducer;
