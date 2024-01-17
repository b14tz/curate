import { createSlice } from "@reduxjs/toolkit";

interface AppleState {
    accessToken: string | null;
    expirationTime: Date | null;
    appleId: string | null;
}

const initialState: AppleState = {
    accessToken: null,
    expirationTime: null,
    appleId: null,
};

export const appleSlice = createSlice({
    name: "apple",
    initialState,
    reducers: {
        setApple: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.expirationTime = action.payload.expirationTime;
            state.appleId = action.payload.appleId;
        },
        clearApple: (state) => {
            state.accessToken = null;
            state.expirationTime = null;
            state.appleId = null;
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
