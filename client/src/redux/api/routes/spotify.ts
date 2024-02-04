import { apiSlice } from "../apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTopSpotifyPlaylists: builder.query<Playlist[], void>({
            query: () => "/spotify/playlists/top",
        }),
        getSpotifyPlaylistById: builder.query<Playlist, string>({
            query: (id) => `/spotify/playlist/${id}`,
        }),
    }),
});

export const {
    useGetTopSpotifyPlaylistsQuery,
    useGetSpotifyPlaylistByIdQuery,
} = extendedApiSlice;
