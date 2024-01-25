import { createSlice } from "@reduxjs/toolkit";

interface SpotifyState {
    accessToken: string | null;
    expirationTime: Date | null;
    spotifyId: string | null;
    refreshToken: string | null;
}

const initialState: SpotifyState = {
    accessToken: null,
    expirationTime: null,
    spotifyId: null,
    refreshToken: null,
};

export const spotifySlice = createSlice({
    name: "spotify",
    initialState,
    reducers: {
        setSpotify: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.expirationTime = action.payload.expirationTime;
            state.spotifyId = action.payload.spotifyId;
            state.refreshToken = action.payload.refreshToken;
        },
        clearSpotify: (state) => {
            state.accessToken = null;
            state.expirationTime = null;
            state.spotifyId = null;
            state.refreshToken = null;
        },
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.expirationTime = action.payload.expirationTime;
        },
    },
});

export const isSpotifyTokenExpired = (state: SpotifyState) => {
    if (!state.expirationTime) {
        return true;
    }
    return new Date(state.expirationTime) < new Date();
};

export const { setSpotify, clearSpotify, updateAccessToken } =
    spotifySlice.actions;
export default spotifySlice.reducer;
