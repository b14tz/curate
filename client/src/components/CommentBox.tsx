import { useSnackbar } from "notistack";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useCreateCommentMutation } from "@/redux/api/routes/comment";

export default function CommentBox({ post }: { post: Post }) {
    const { enqueueSnackbar } = useSnackbar();
    const [content, setContent] = useState("");
    const [createComment] = useCreateCommentMutation();
    const currentUser = useSelector(
        (state: RootState) => state.userReducer.user
    );

    const handleCreateComment = async () => {
        if (currentUser) {
            await createComment({
                userId: currentUser.id,
                postId: post.id,
                content,
            }).unwrap();
            setContent("");
        } else {
            enqueueSnackbar("You must be logged in to comment on a post.", {
                autoHideDuration: 2000,
            });
        }
    };

    return (
        <div className="mt-2 space-y-2 flex flex-col">
            <Textarea
                rows={5}
                placeholder="Add a comment..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></Textarea>
            <Button className="self-end " onClick={handleCreateComment}>
                Comment
            </Button>
        </div>
    );
}
