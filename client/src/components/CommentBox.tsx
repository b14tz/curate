import { useSnackbar } from "notistack";
import { useState } from "react";
import { useSelector } from "react-redux";
import { createComment } from "@/api/routes/comment";
import { RootState } from "@/redux/store";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function CommentBox({
    post,
    setPost,
}: {
    post: Post;
    setPost: (val: Post) => void;
}) {
    const [content, setContent] = useState("");
    const currentUser = useSelector(
        (state: RootState) => state.userReducer.user
    );
    const { enqueueSnackbar } = useSnackbar();

    const handleCreateComment = async () => {
        if (currentUser) {
            const comment = await createComment(post.id, {
                content,
                authorId: currentUser.id,
            });
            setPost({ ...post, comments: [comment, ...post.comments] });
            setContent("");
        } else {
            enqueueSnackbar("You must be logged in to comment on a post.", {
                autoHideDuration: 2000,
            });
        }
    };

    return (
        <div className="mt-2 space-y-4 flex flex-col">
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
