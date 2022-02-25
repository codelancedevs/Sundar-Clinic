/**
 * App Actions and Reducers
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        inputs: {},
        errors: {},
    },
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        
    },
});

// Exporting Actions
export const { } = authSlice.actions;

// Exporting Reducer
export default authSlice.reducer;
