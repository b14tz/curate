import axiosInstance from "../axios";

// GET /like/all/:id
export const getAllPostLikes = async (id: string) => {
    const res = await axiosInstance.get(`/like/all/${id}`);
    return res.data;
};

// POST /like/:id
export const createLike = async (postId: string, data: { userId: string }) => {
    const res = await axiosInstance.post(`/like/${postId}`, data);
    return res.data;
};

// POST /like/remove/:id
export const deleteLike = async (postId: string, data: { userId: string }) => {
    const res = await axiosInstance.post(`/like/remove/${postId}`, data);
    return res.data;
};
