import { createSlice } from "@reduxjs/toolkit";

interface SpotifyState {
    accessToken: string | null;
    expirationTime: Date | null;
}

const initialState: SpotifyState = {
    accessToken: null,
    expirationTime: null,
};

export const spotifySlice = createSlice({
    name: "spotify",
    initialState,
    reducers: {
        setSpotify: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.expirationTime = action.payload.expirationTime;
        },
        clearSpotify: (state) => {
            state.accessToken = null;
            state.expirationTime = null;
        },
    },
});

export const { setSpotify, clearSpotify } = spotifySlice.actions;
export default spotifySlice.reducer;
