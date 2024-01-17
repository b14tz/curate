import { createSlice } from "@reduxjs/toolkit";

interface SpotifyState {
    accessToken: string | null;
    expirationTime: Date | null;
    spotifyId: string | null;
}

const initialState: SpotifyState = {
    accessToken: null,
    expirationTime: null,
    spotifyId: null,
};

export const spotifySlice = createSlice({
    name: "spotify",
    initialState,
    reducers: {
        setSpotify: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.expirationTime = action.payload.expirationTime;
            state.spotifyId = action.payload.spotifyId;
        },
        clearSpotify: (state) => {
            state.accessToken = null;
            state.expirationTime = null;
            state.spotifyId = null;
        },
    },
});

export const { setSpotify, clearSpotify } = spotifySlice.actions;
export default spotifySlice.reducer;
