import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { requestAccessToken } from "~/api/routes/spotify";
import { setSpotify } from "~/redux/features/spotify/spotifySlice";
import { getExpirationDate } from "~/utils/time";

export default function SpotifyCallback({}: {}) {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function handleRequestAccessToken() {
            const code = new URLSearchParams(location.search).get("code");
            console.log("code: ", code);
            if (code) {
                const token = await requestAccessToken(code);
                const expirationTime = await getExpirationDate(
                    token.expires_in
                );
                await dispatch(
                    setSpotify({
                        accessToken: token.access_token,
                        expirationTime: expirationTime,
                    })
                );
                navigate("/");
            }
        }
        handleRequestAccessToken();
    }, [location]);

    return (
        <div className="w-full h-[400px] flex items-center justify-center">
            <p>Redirecting...</p>
        </div>
    );
}
