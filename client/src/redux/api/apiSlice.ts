import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_URL || "http://localhost:3300/api",
    }),
    tagTypes: ["Post", "User", "Spotify", "Apple", "Comment", "Follow", "Like"],
    endpoints: () => ({}),
});
