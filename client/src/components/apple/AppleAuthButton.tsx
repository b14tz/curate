import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppleDeveloperToken } from "@/api/routes/apple";
import { setApple } from "@/redux/features/apple/appleSlice";
import { RootState } from "@/redux/store";
import { getExpirationTime } from "@/utils/time";
import { Button } from "../ui/button";

export default function AppleAuthButton() {
    const [appleTokenExpirationTime, setAppleTokenExpirationTime] = useState(
        new Date()
    );

    const now = new Date();
    const dispatch = useDispatch();
    const appleToken = useSelector((state: RootState) => state.appleReducer);

    useEffect(() => {
        const loadMusicKit = async () => {
            const developerToken = await getAppleDeveloperToken();
            console.log("Developer Token: ", developerToken);
            window.MusicKit.configure({
                developerToken,
                app: {
                    name: "Curate",
                    build: "0.0.1",
                },
            });
        };
        setAppleTokenExpirationTime(
            new Date(appleToken.expirationTime ? appleToken.expirationTime : "")
        );
        loadMusicKit();
    }, [appleToken]);

    const authorize = async () => {
        try {
            const music = window.MusicKit.getInstance();
            const musicUserToken = await music.authorize();
            const expirationSeconds = 90 * 24 * 60 * 60; // Example: 90 days for illustration
            const expirationTime = await getExpirationTime(expirationSeconds);

            dispatch(
                setApple({
                    musicUserToken,
                    expirationTime,
                })
            );
        } catch (error) {
            console.error("Authorization error:", error);
        }
    };
    return (
        <div>
            {appleToken.musicUserToken &&
            appleToken.expirationTime &&
            appleTokenExpirationTime > now ? null : (
                <Button
                    variant="link"
                    className="underline text-xs text-silver"
                    onClick={authorize}
                >
                    Connect Apple Music Account
                </Button>
            )}
        </div>
    );
}
