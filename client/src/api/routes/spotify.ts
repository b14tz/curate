import axiosInstance from "../axios";

export const requestAccessToken = async (code: string) => {
    const res = await axiosInstance.post("/spotify/token", { code });
    return res.data;
};

export const refreshAccessToken = async (refreshToken: string) => {
    const res = await axiosInstance.post("/spotify/refresh", {
        refreshToken,
    });
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
    const res = await axiosInstance.post(
        `/spotify/playlists/user/${spotifyId}`,
        { token }
    );
    return res.data;
};

export const fetchSpotifyPlaylistById = async (playlistId: string) => {
    const res = await axiosInstance.get(`spotify/playlist/${playlistId}`);
    return res.data;
};

export const fetchTopSpotifyPlaylists = async () => {
    const res = await axiosInstance.get("/spotify/playlists/top");
    return res.data;
};

export const searchSpotify = async (search: Search) => {
    search = { ...search, term: encodeURIComponent(search.term) };
    const res = await axiosInstance.post("/spotify/search", search);
    return res.data;
};
