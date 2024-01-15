import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { requestAccessToken } from "~/api/routes/spotify";

export default function SpotifyCallback({}: {}) {
    const [aToken, setAToken] = useState("");
    const location = useLocation();

    useEffect(() => {
        async function handleRequestAccessToken() {
            const code = new URLSearchParams(location.search).get("code");
            console.log("code: ", code);
            if (code) {
                const token = await requestAccessToken(code);
                console.log("token: ", token);
                setAToken(token);
                // save the token to a redux store here
            }
        }
        handleRequestAccessToken();
    }, [location]);

    return aToken ? (
        <div>
            <p>{JSON.stringify(aToken)}</p>
        </div>
    ) : (
        <div>Redirecting...</div>
    );
}
