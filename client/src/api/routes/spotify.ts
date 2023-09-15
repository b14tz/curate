import axiosInstance from "../axios";

// POST /spotify/search
export const searchSpotify = async (search: Search) => {
    search = { ...search, term: encodeURIComponent(search.term) };
    const res = await axiosInstance.post("/spotify/search", search);
    return res.data;
};

// GET /spotify/feed
export const populateSpotifyFeed = async () => {
    const res = await axiosInstance.get("/spotify/feed");
    return res.data;
};
