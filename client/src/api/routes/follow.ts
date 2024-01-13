import axiosInstance from "../axios";

// POST /follow
export const followUser = async (data: {
    followerId: string;
    followingId: string;
}) => {
    const res = await axiosInstance.post("/follow", data);
    return res.data;
};

// POST /follow/remove
export const unfollowUser = async (data: {
    followerId: string;
    followingId: string;
}) => {
    const res = await axiosInstance.post("/follow/remove", data);
    return res.data;
};
