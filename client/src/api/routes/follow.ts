import axiosInstance from "../axios";

// POST /follow
export const createFollow = async (data: {
    followerId: string;
    followingId: string;
}) => {
    const res = await axiosInstance.post("/follow", data);
    return res.data;
};

// POST /follow/remove
export const deleteFollow = async (data: {
    followerId: string;
    followingId: string;
}) => {
    const res = await axiosInstance.post("/follow/remove", data);
    return res.data;
};
