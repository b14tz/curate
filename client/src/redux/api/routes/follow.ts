import { apiSlice } from "../apiSlice";

interface FollowForm {
    followerId: string;
    followingId: string;
}

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createFollow: builder.mutation<{ message: string }, FollowForm>({
            query: ({ ...patch }) => ({
                url: `/follow`,
                method: "POST",
                body: patch,
            }),
            invalidatesTags: (_result, _error, args) => [
                { type: "User", id: args.followerId },
                { type: "User", id: args.followingId },
            ],
        }),
        deleteFollow: builder.mutation<{ message: string }, FollowForm>({
            query: ({ ...patch }) => ({
                url: `/follow/remove`,
                method: "POST",
                body: patch,
            }),
            invalidatesTags: (_result, _error, args) => [
                { type: "User", id: args.followerId },
                { type: "User", id: args.followingId },
            ],
        }),
    }),
});

export const { useCreateFollowMutation, useDeleteFollowMutation } =
    extendedApiSlice;
