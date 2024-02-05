import { apiSlice } from "../apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<User, string>({
            query: (id) => `/user/${id}`,
        }),
    }),
});

export const { useGetUserQuery } = extendedApiSlice;
