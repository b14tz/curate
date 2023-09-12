import { useState } from "react";
import { generateSpotifyClientToken } from "../api/routes/spotify";

export default function HomePage() {
    const [serverResponse, setServerResponse] = useState("...");
    const handleSpotifyAuthTokenGeneration = async () => {
        const res = await generateSpotifyClientToken();
        setServerResponse(res);
    };

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-4">
                <button
                    className="bg-green rounded shadow px-4 w-fit"
                    onClick={handleSpotifyAuthTokenGeneration}
                >
                    generate token
                </button>
                <p className="text-green">{serverResponse}</p>
            </div>
            <div className="flex flex-row space-x-4">
                <input className="shadow" />
                <button className="bg-salmon rounded shadow px-4">
                    search
                </button>
            </div>
        </div>
    );
}
