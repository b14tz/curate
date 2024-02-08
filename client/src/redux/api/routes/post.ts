import { apiSlice } from "../apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllPosts: builder.query<Post[], void>({
            query: () => "/post",
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: "Post" as const,
                              id,
                          })),
                          { type: "Post", id: "LIST" },
                      ]
                    : [{ type: "Post", id: "LIST" }],
        }),
        getFollowerPosts: builder.query<Post[], string>({
            query: (id) => `/post/user/${id}/followers`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: "Post" as const,
                              id,
                          })),
                          { type: "Post", id: "LIST" },
                      ]
                    : [{ type: "Post", id: "LIST" }],
        }),
        getUserPosts: builder.query<Post[], string>({
            query: (id) => `/post/user/${id}`,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: "Post" as const,
                              id,
                          })),
                          { type: "Post", id: "LIST" },
                      ]
                    : [{ type: "Post", id: "LIST" }],
        }),
        getPost: builder.query<Post, string>({
            query: (id) => `/post/${id}`,
            providesTags: (_result, _error, id) => [{ type: "Post", id }],
        }),
        createPost: builder.mutation<Post, PostForm>({
            query: ({ ...patch }) => ({
                url: `/post`,
                method: "POST",
                body: patch,
            }),
            invalidatesTags: [{ type: "Post", id: "LIST" }],
        }),
        updatePost: builder.mutation<Post, Partial<Post> & Pick<Post, "id">>({
            query: ({ id, ...patch }) => ({
                url: `/post/${id}`,
                method: "PUT",
                body: patch,
            }),
            invalidatesTags: [{ type: "Post", id: "LIST" }],
        }),
        deletePost: builder.mutation<Post, string>({
            query: (id) => ({ url: `/post/${id}`, method: "DELETE" }),
            invalidatesTags: [{ type: "Post", id: "LIST" }],
        }),
        savePost: builder.mutation<QueryResponse, string>({
            query: (id) => `/post/${id}/save`,
            invalidatesTags: (_result, _error, id) => [{ type: "Post", id }],
        }),
    }),
});

export const {
    useGetAllPostsQuery,
    useGetFollowerPostsQuery,
    useGetUserPostsQuery,
    useGetPostQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
} = extendedApiSlice;
