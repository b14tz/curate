import { useDeletePostMutation } from "@/redux/api/routes/post";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { useNavigate } from "react-router-dom";

export default function DeletePostModal({
    id,
    children,
}: {
    id: string;
    children: JSX.Element;
}) {
    const [deletePost] = useDeletePostMutation();
    const navigate = useNavigate();

    const handleDeletePost = async () => {
        await deletePost(id).unwrap();
        navigate("/");
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Post</DialogTitle>
                </DialogHeader>
                <p>
                    Are you sure you want to delete this post? All data will be
                    gone for good.
                </p>

                <Button
                    onClick={() => handleDeletePost()}
                    variant="destructive"
                    className="w-full"
                >
                    Delete Post
                </Button>
            </DialogContent>
        </Dialog>
    );
}
