import { createSlice } from "@reduxjs/toolkit";

interface AppleState {
    musicUserToken: string | null;
    expirationTime: Date | null;
}

const initialState: AppleState = {
    musicUserToken: null,
    expirationTime: null,
};

export const appleSlice = createSlice({
    name: "apple",
    initialState,
    reducers: {
        setApple: (state, action) => {
            state.musicUserToken = action.payload.musicUserToken;
            state.expirationTime = action.payload.expirationTime;
        },
        clearApple: (state) => {
            state.musicUserToken = null;
            state.expirationTime = null;
        },
    },
});

export const isAppleTokenExpired = (state: AppleState) => {
    if (!state.expirationTime) {
        return true;
    }
    return new Date(state.expirationTime) < new Date();
};

export const { setApple, clearApple } = appleSlice.actions;
export default appleSlice.reducer;
