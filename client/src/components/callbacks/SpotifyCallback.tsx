import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchUserSpotifyID, requestAccessToken } from "~/api/routes/spotify";
import { setSpotify } from "~/redux/features/spotify/spotifySlice";
import { getExpirationTime } from "~/utils/time";

export default function SpotifyCallback({}: {}) {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function handleRequestAccessToken() {
            const code = new URLSearchParams(location.search).get("code");
            if (code) {
                const token = await requestAccessToken(code);
                const spotifyId = await fetchUserSpotifyID(token.access_token);
                const expirationTime = await getExpirationTime(
                    token.expires_in
                );
                // console.log("Scopes: ", token.scope);
                await dispatch(
                    setSpotify({
                        accessToken: token.access_token,
                        expirationTime: expirationTime,
                        spotifyId: spotifyId,
                        refreshToken: token.refresh_token,
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
