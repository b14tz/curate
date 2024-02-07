import { apiSlice } from "../apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<User, string>({
            query: (id) => `/user/${id}`,
            providesTags: (_result, _error, id) => [{ type: "User", id }],
        }),
        createUser: builder.mutation<User, Partial<User>>({
            query: ({ ...patch }) => ({
                url: `/user`,
                method: "POST",
                body: patch,
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),
        updateUser: builder.mutation<User, Partial<User> & Pick<User, "id">>({
            query: ({ id, ...patch }) => ({
                url: `/user/${id}`,
                method: "PUT",
                body: patch,
            }),
            invalidatesTags: (_result, _error, arg) => [
                { type: "User", id: arg.id },
            ],
        }),
        deleteUser: builder.mutation<User, string>({
            query: (id) => ({ url: `/user/${id}`, method: "DELETE" }),
            invalidatesTags: (_result, _error, id) => [{ type: "User", id }],
        }),
    }),
});

export const {
    useGetUserQuery,
    useCreateUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
} = extendedApiSlice;
