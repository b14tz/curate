// src/redux/features/user/userSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login as loginApi } from "~/api/routes/user";

interface User {
    // Define the User type structure here
    id: string;
    name: string;
    // Add other user properties as needed
}

interface UserState {
    loading: boolean;
    user: User | undefined;
    error: string | undefined;
}

const initialState: UserState = {
    loading: false,
    user: undefined,
    error: undefined,
};

// Async thunk for user login
export const login = createAsyncThunk(
    "user/login",
    async ({}, { rejectWithValue }) => {
        try {
            const response = await loginApi();
            // Set the JWT token in Cookies or localStorage here if needed
            // e.g., Cookies.set('token', response.data.token);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // You can add other reducers here as needed
        logout: (state) => {
            state.user = undefined;
            // Clear the JWT token from Cookies or localStorage
            // e.g., Cookies.remove('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
