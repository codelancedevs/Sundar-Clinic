/**
 * App Actions and Reducers
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        snackbar: {
            display: false,
            message: '',
            type: 'error', // error, warning, info, success
        },
        showLoading: false,
    },
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        showSnackbar: (state, action) => {
            state.value.snackbar.display = true;
            state.value.snackbar = { ...state.snackbar, ...action.payload };
        },
        hideSnackbar: (state, action) => {
            state.value.snackbar.display = false;
        },
    },
});

// Exporting Actions
export const { showSnackbar, hideSnackbar } = appSlice.actions;

// Exporting Reducer
export default appSlice.reducer;
