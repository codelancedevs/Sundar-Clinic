/**
 * User Actions and Reducers
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: {
		user: localStorage.getItem("user")
			? JSON.parse(localStorage.getItem("user"))
			: false,
	},
};

export const userSplice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action) => {
			// Action Payload: {user} : 'Object' Reference Structure below
			state.value.user = action.payload.user;
			localStorage.setItem("user", JSON.stringify(state.value.user));
		},
		logout: (state) => {
			// Action Payload: none
			state.value.user = false;
			localStorage.removeItem("user");
		},
	},
});

// Exporting Actions
export const { login, logout } = userSplice.actions;

// Exporting Reducer
export default userSplice.reducer;

// const user = {
// 	fullName: "",
// 	username: "",
// 	email: "",
// 	phone: "",
// 	defaultAvatar: "",
// 	avatar: "",
// 	role: "",
// 	address: "",
// 	adminDetails: {
// 		degrees: [],
// 	},
// 	dateOfBirth: "",
// 	maritalStatus: {
// 		isMarried: false,
// 		marriedTo: "",
// 	},
// 	kidsDetails: {
// 		hasKids: false,
// 		kids: [],
// 	},
// 	presentingComplaint: [],
// 	history: {
// 		comorbidity: [],
// 		drug: [],
// 		allergies: [],
// 		family: [],
// 		food: [],
// 		sanitary: [],
// 		surgical: [],
// 		pregnancy: [],
// 		menstrual: [],
// 		vasectomy: [],
// 	},
// 	verification: {
// 		isVerified: false,
// 		verifiedAt: "",
// 	},
// 	tosAgreement: false,
// 	createdAt: "",
// 	updatedAt: "",
// };
