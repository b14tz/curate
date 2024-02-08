import { useDispatch, useSelector } from "react-redux";
import AppleAuthToggle from "./apple/AppleAuthToggle";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { RootState } from "@/redux/store";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { clearUser, setUser } from "@/redux/features/user/userSlice";
import { clearSpotify } from "@/redux/features/spotify/spotifySlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    useDeleteUserMutation,
    useUpdateUserMutation,
} from "@/redux/api/routes/user";
import { enqueueSnackbar } from "notistack";

export default function SettingsModal({
    user,
    children,
}: {
    user: User;
    children: JSX.Element;
}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const [displayName, setDisplayName] = useState<string>("");

    const spotifyToken = useSelector(
        (state: RootState) => state.spotifyReducer
    );
    const currentUser = useSelector(
        (state: RootState) => state.userReducer.user
    );

    const handleChangeUsername = async () => {
        try {
            await updateUser({
                id: user.id,
                displayName: displayName,
            }).unwrap();
            dispatch(setUser({ ...currentUser, displayName: displayName }));
            enqueueSnackbar({
                message: `Successfully changed username to "${displayName}"`,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteUser(user.id).unwrap();
            dispatch(clearUser());
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setDisplayName(user.displayName);
    }, [user]);

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] min-w-[450px]">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col">
                        <p>
                            {user.firstName} {user.lastName}
                        </p>
                        <p>{user.email}</p>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="username">Username</Label>
                        <div
                            onSubmit={handleChangeUsername}
                            className="flex flex-row space-x-2"
                        >
                            <Input
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                            <Button
                                variant="outline"
                                onClick={() => handleChangeUsername()}
                            >
                                Change
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                        {spotifyToken.refreshToken ? (
                            <Button
                                className="w-full"
                                variant="secondary"
                                onClick={() => {
                                    dispatch(clearSpotify());
                                }}
                            >
                                Disconnect Spotify Account
                            </Button>
                        ) : (
                            <Button
                                className="w-full"
                                variant="secondary"
                                onClick={() => {
                                    window.location.href = `${
                                        import.meta.env.VITE_SERVER_URL
                                    }/spotify/auth`;
                                }}
                            >
                                Connect Spotify Account
                            </Button>
                        )}
                        <AppleAuthToggle />
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="destructive" className="w-full">
                                Delete Account
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Account</DialogTitle>
                            </DialogHeader>
                            <p>
                                Are you sure you want to delete your account?
                                All data will be gone for good.
                            </p>
                            <Button
                                onClick={() => handleDeleteAccount()}
                                variant="destructive"
                            >
                                Delete
                            </Button>
                        </DialogContent>
                    </Dialog>
                </div>
            </DialogContent>
        </Dialog>
    );
}
