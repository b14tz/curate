import axiosInstance from "../axios";

// GET /like/all/:id
export const getAllPostLikes = async (id: string) => {
    const res = await axiosInstance.get(`/like/all/${id}`);
    return res.data;
};

// POST /like/:id
export const createLike = async (data: { userId: string; postId: string }) => {
    const res = await axiosInstance.post(`/like`, data);
    return res.data;
};

// POST /like/remove/:id
export const deleteLike = async (data: { userId: string; postId: string }) => {
    const res = await axiosInstance.post(`/like/remove`, data);
    return res.data;
};
