import { apiSlice } from "../apiSlice";

interface LikeForm {
    postId: string;
    userId: string;
}

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createLike: builder.mutation<{ message: string }, LikeForm>({
            query: ({ ...patch }) => ({
                url: `/like`,
                method: "POST",
                body: patch,
            }),
            invalidatesTags: (_result, _error, args) => [
                { type: "Post", id: args.postId },
            ],
        }),
        deleteLike: builder.mutation<{ message: string }, LikeForm>({
            query: ({ ...patch }) => ({
                url: `/like/remove`,
                method: "POST",
                body: patch,
            }),
            invalidatesTags: (_result, _error, args) => [
                { type: "Post", id: args.postId },
            ],
        }),
    }),
});

export const { useCreateLikeMutation, useDeleteLikeMutation } =
    extendedApiSlice;
