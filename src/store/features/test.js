import { createSlice } from '@reduxjs/toolkit';

export const testSlice = createSlice({
	name: 'test',
	initialState: { value: 0 },
	reducers: {
		rotate: (state, action) => {
			state.value += action.payload + 2;
		},
	},
});

export const { rotate } = testSlice.actions;

export default testSlice.reducer;
