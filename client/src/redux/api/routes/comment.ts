import { apiSlice } from "../apiSlice";

interface CommentForm {
    postId: string;
    userId: string;
    content: string;
}

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createComment: builder.mutation<QueryResponse, CommentForm>({
            query: ({ ...patch }) => ({
                url: `/comment`,
                method: "POST",
                body: patch,
            }),
            invalidatesTags: (_result, _error, args) => [
                { type: "Post", id: args.postId },
            ],
        }),
        deleteComment: builder.mutation<PostComment, string>({
            query: (id) => ({ url: `/comment/${id}`, method: "DELETE" }),
            invalidatesTags: (result) => [
                { type: "Post", id: result?.post.id },
            ],
        }),
    }),
});

export const { useCreateCommentMutation, useDeleteCommentMutation } =
    extendedApiSlice;
