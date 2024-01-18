import axiosInstance from "../axios";

export const requestAccessToken = async (code: string) => {
    const res = await axiosInstance.post("/spotify/token", { code });
    return res.data;
};

export const fetchUserSpotifyID = async (token: string) => {
    const res = await axiosInstance.post("/spotify/id", { token });
    return res.data;
};

export const fetchAllSpotifyPlaylistsByUserId = async ({
    token,
    spotifyId,
}: {
    token: string;
    spotifyId: string;
}) => {
    const res = await axiosInstance.post("/spotify/playlists", {
        token,
        spotifyId,
    });
    return res.data;
};

export const fetchIsrcsByPlaylistId = async ({
    token,
    playlistId,
}: {
    token: string;
    playlistId: string;
}) => {
    const res = await axiosInstance.post("/spotify/isrcs", {
        token,
        playlistId,
    });
    return res.data;
};

export const fetchPlaylistByIsrcs = async ({
    token,
    isrcs,
}: {
    token: string;
    isrcs: string;
}) => {
    const res = await axiosInstance.post("/spotify/playlist", {
        token,
        isrcs,
    });
    return res.data;
};

// GET /spotify/feed
export const populateSpotifyFeed = async () => {
    const res = await axiosInstance.get("/spotify/feed");
    return res.data;
};

// POST /spotify/search
export const searchSpotify = async (search: Search) => {
    search = { ...search, term: encodeURIComponent(search.term) };
    const res = await axiosInstance.post("/spotify/search", search);
    return res.data;
};
