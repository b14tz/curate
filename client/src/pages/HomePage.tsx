import { useState } from "react";
import { getSpotifyClientToken } from "../api/routes/spotify";

export default function HomePage() {
    const [serverResponse, setServerResponse] = useState("...");
    const handleGetSpotifyAuthToken = async () => {
        const res = await getSpotifyClientToken();
        setServerResponse(res);
    };

    return (
        <div className="flex flex-col space-y-4">
            <button
                className="bg-green rounded shadow px-4 w-fit"
                onClick={handleGetSpotifyAuthToken}
            >
                get client token
            </button>
            <p className="text-green">{serverResponse}</p>
            <div className="flex flex-row space-x-4">
                <input className="shadow" />
                <button className="bg-salmon rounded shadow px-4">
                    search
                </button>
            </div>
        </div>
    );
}
