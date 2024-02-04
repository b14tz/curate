import { apiSlice } from "../apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTopApplePlaylists: builder.query<Playlist[], void>({
            query: () => "/apple/playlists/top",
        }),
        getApplePlaylistById: builder.query<Playlist, string>({
            query: (id) => `/apple/playlist/${id}`,
        }),
    }),
});

export const { useGetTopApplePlaylistsQuery, useGetApplePlaylistByIdQuery } =
    extendedApiSlice;
