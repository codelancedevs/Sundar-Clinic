import { createSlice } from '@reduxjs/toolkit';

export const testSlice = createSlice({
	name: 'test',
	initialState: { value: 0 },
	reducers: {
		rotate: (state, action) => {
			state.value += 100;
			if (state.value > 900) {
				state.value = 0;
			}
		},
	},
});

export const { rotate } = testSlice.actions;

export default testSlice.reducer;
