// discoverpage.tsx
import { useEffect, useState } from "react";
import { ButtonGroup } from "../components/ButtonGroup";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchTopSpotifyPlaylists } from "~/api/routes/spotify";
import TopPlaylistFeed from "~/components/TopPlaylistFeed";
import { fetchTopApplePlaylists } from "~/api/routes/apple";

export default function DiscoverPage() {
    const [playlists, setPlaylists] = useState<TopPlaylist[]>([]);
    const [emptyMessage, setEmptyMessage] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    async function handleFetchTopSpotifyPlaylists() {
        setEmptyMessage(
            "It looks like there aren't any spotify recommendations at this time."
        );
        const data = await fetchTopSpotifyPlaylists();
        setPlaylists(data);
    }

    async function handleFetchTopApplePlaylists() {
        setEmptyMessage(
            "It looks like there aren't any apple recommendations at this time."
        );
        const data = await fetchTopApplePlaylists();
        setPlaylists(data);
    }

    useEffect(() => {
        const path = location.pathname.split("/").pop();
        if (path === "apple") {
            handleFetchTopApplePlaylists();
        } else {
            handleFetchTopSpotifyPlaylists();
        }
    }, [location.pathname]);

    return (
        <div className="space-y-4">
            <h3>Discover</h3>
            <hr />
            <ButtonGroup
                buttonClasses=""
                groupClasses="space-x-8"
                activeClasses=" border-b-2 border-solid border-salmon"
                groupButtons={[
                    {
                        label: "Spotify Top Playlists",
                        value: "spotify",
                        onClick: () => navigate("/discover/spotify"),
                    },
                    {
                        label: "Apple Music Top Playlists",
                        value: "apple",
                        onClick: () => navigate("/discover/apple"),
                    },
                ]}
            />

            <TopPlaylistFeed
                playlists={playlists}
                emptyMessage={emptyMessage}
            />
        </div>
    );
}
