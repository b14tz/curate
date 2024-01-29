// discoverpage.tsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchTopSpotifyPlaylists } from "~/api/routes/spotify";
import PlaylistFeed from "~/components/PlaylistFeed";
import { fetchTopApplePlaylists } from "~/api/routes/apple";
import StyledNavLink from "~/components/StyledNavLink";

export default function DiscoverPage() {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [emptyMessage, setEmptyMessage] = useState("");

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

            <div className="flex space-x-4">
                <StyledNavLink
                    to="/discover/spotify"
                    label="Top Spotify Playlists"
                    pendingClasses="text-black"
                    activeClasses="text-black border-b-2 border-salmon"
                />
                <StyledNavLink
                    to="/discover/apple"
                    label="Top Apple Music Playlists"
                    pendingClasses="text-black"
                    activeClasses="text-black border-b-2 border-salmon"
                />
            </div>

            <PlaylistFeed playlists={playlists} emptyMessage={emptyMessage} />
        </div>
    );
}
