import { useState } from "react";
import { useSelector } from "react-redux";
import { createComment } from "~/api/routes/comment";
import { RootState } from "~/redux/store";

export default function CommentBox({
    post,
    setPost,
}: {
    post: Post;
    setPost: (val: Post) => void;
}) {
    const [content, setContent] = useState("");
    const user = useSelector((state: RootState) => state.user);

    const handleCreateComment = async () => {
        if (user) {
            const comment = await createComment(post.id, {
                content,
                authorId: user.id,
            });
            console.log("comment: ", comment);
            setPost({ ...post, comments: [comment, ...post.comments] });
        }
    };

    return (
        <div className="mt-2 space-y-4 flex flex-col">
            <textarea
                className="w-full p-2 text-sm border rounded resize-none shadow-inner bg-b-tertiary"
                rows={5}
                placeholder="Add a comment..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button
                className="py-2 px-4 rounded bg-salmon text-white w-fit self-end "
                onClick={handleCreateComment}
            >
                Comment
            </button>
        </div>
    );
}
