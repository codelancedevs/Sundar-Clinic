/**
 * User Actions and Reducers
 */

import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
    fullName: '',
    username: '',
    email: '',
    phone: '',
    defaultAvatar: '',
    avatar: '',
    role: '',
    address: '',
    isVerified: false,
    tosAgreement: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {value: initialStateValue},
    reducer: {
        register: (state, action) => {
            
        },
        login: (state, action) => {

        },
        logout: (state, action) => {

        }
        
    }
})

// Exporting Actions
export const {register, login, logout} = userSlice.actions;

// Exporting Reducer
export default userSlice.reducer;