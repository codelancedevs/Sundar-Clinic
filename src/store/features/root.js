/**
 * App Actions and Reducers
 */

import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {};

export const rootSlice = createSlice({
    name: 'root',
    initialState: { value: initialStateValue },
    reducers: {},
});

// Exporting Actions
export const { } = rootSlice.actions;

// Exporting Reducer
export default rootSlice.reducer;
