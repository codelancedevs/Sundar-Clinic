/**
 * User Actions and Reducers
 */

import { createSlice } from "@reduxjs/toolkit";

const user = {
	fullName: "",
	username: "",
	email: "",
	phone: "",
	defaultAvatar: "",
	avatar: "",
	role: "",
	address: "",
	dateOfBirth: "",
	maritalStatus: {
		isMarried: false,
		marriedTo: "",
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
	verification: {
		isVerified: false,
		verifiedAt: "",
	},
	tosAgreement: false,
	createdAt: "",
	updatedAt: "",
};

const initialState = {
	value: {
		loggedIn: localStorage.getItem("loggedIn")
			? JSON.parse(localStorage.getItem("loggedIn"))
			: false,
		user: localStorage.getItem("user")
			? JSON.parse(localStorage.getItem("user"))
			: user,
	},
};

export const userSplice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action) => {
			state.value.user = action.payload.user;
			const loggedIn = {
				loggedInAs: action.payload.loggedInAs,
			};
			localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
			localStorage.setItem("user", JSON.stringify(state.value.user));
			state.value.loggedIn = loggedIn;
		},
		logout: (state, action) => {
			state.value.loggedIn = false;
			state.value.user = { ...user };
			localStorage.removeItem("loggedIn");
			localStorage.removeItem("user");
		},
	},
});

// Exporting Actions
export const { login, logout } = userSplice.actions;

// Exporting Reducer
export default userSplice.reducer;
