/**
 * App Actions and Reducers
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        snackbar: {
            display: false,
            message: "",
            type: "error", // error, warning, info, success
        },
        dialog: {},
        showLoading: false,
        site: {
            contact: {
                phone: '',
                email: '',
            },
            detail: '',
            link: ''
        },
        owner: {
            name: '',
            clinic: {
                address: '',
                doctors: [],
                documents: [],
            }
        }
    },
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        showSnackbar: (state, action) => {
            // Action Payload: {message, type} : 'String'
            state.value.snackbar = { ...initialState.value.snackbar, display: true, ...action.payload }
        },
        hideSnackbar: (state, action) => {
            // Action Payload: none
            state.value.snackbar.display = false;
        },
        loading: (state, action) => {
            // Action Payload: boolean
            state.value.showLoading = action.payload;
        }
    },
});

// Exporting Actions
export const { showSnackbar, hideSnackbar, loading } = appSlice.actions;

// Exporting Reducer
export default appSlice.reducer;
