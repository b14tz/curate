import axiosInstance from "../axios";

// GET /inquiry
export const getSpotifyClientToken = async () => {
    const res = await axiosInstance.get("/spotify");
    return res.data;
};
