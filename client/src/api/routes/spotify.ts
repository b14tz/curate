import axiosInstance from "../axios";

// GET /inquiry
export const searchSpotify = async (search: Search) => {
    search = { ...search, term: encodeURIComponent(search.term) };
    const res = await axiosInstance.post("/spotify/search", search);
    return res.data;
};
