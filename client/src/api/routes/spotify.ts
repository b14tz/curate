import axiosInstance from "../axios";

// GET /inquiry
export const generateSpotifyClientToken = async () => {
    const res = await axiosInstance.post("/spotify");
    return res.data;
};
