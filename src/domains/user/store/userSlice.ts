// File: src/domains/user/store/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../services/userService';
import type { User } from '../types';

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

// Async thunk để lấy dữ liệu người dùng
export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile',
    async () => {
        const response = await userService.fetchProfile();
        return response;
    }
);

// Async thunk để cập nhật dữ liệu người dùng
export const updateUserProfile = createAsyncThunk(
    'user/updateUserProfile',
    async (user: User) => {
        const response = await userService.updateProfile(user);
        return response;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Xử lý fetchUserProfile
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch user profile';
            })
            // Xử lý updateUserProfile
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update user profile';
            });
    },
});

export default userSlice.reducer;
