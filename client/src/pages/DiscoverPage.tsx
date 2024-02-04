import { useLocation } from "react-router-dom";
import PlaylistFeed from "@/components/PlaylistFeed";
import StyledNavLink from "@/components/StyledNavLink";
import { useGetTopApplePlaylistsQuery } from "@/redux/api/routes/apple";
import { useGetTopSpotifyPlaylistsQuery } from "@/redux/api/routes/spotify";

export default function DiscoverPage() {
    const location = useLocation();

    const {
        data: spotifyPlaylists,
        isLoading: isLoadingSpotifyPlaylists,
        error: spotifyPlaylistsError,
    } = useGetTopSpotifyPlaylistsQuery();

    const {
        data: applePlaylists,
        isLoading: isLoadingApplePlaylists,
        error: applePlaylistsError,
    } = useGetTopApplePlaylistsQuery();

    const emptyMessage = location.pathname.includes("/spotify")
        ? "No spotify playlists are recommended at this time."
        : "No apple music playlists are recommended at this time.";

    const postsToShow = location.pathname.includes("/spotify")
        ? spotifyPlaylists
        : applePlaylists;

    const isLoading = location.pathname.includes("/spotify")
        ? isLoadingSpotifyPlaylists
        : isLoadingApplePlaylists;

    const error = location.pathname.includes("/spotify")
        ? spotifyPlaylistsError
        : applePlaylistsError;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching posts</div>;

    return (
        <div className="space-y-6">
            <div className="space-y-2">
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
            </div>

            <PlaylistFeed
                playlists={postsToShow ?? []}
                emptyMessage={emptyMessage}
            />
        </div>
    );
}
