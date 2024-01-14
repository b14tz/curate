import axiosInstance from "../axios";

// GET /comment/all/:id
export const getAllPostComments = async (id: string) => {
    const res = await axiosInstance.get(`/comment/all/${id}`);
    return res.data;
};

// POST /comment/:id
export const createComment = async (
    postId: string,
    data: {
        content: string;
        authorId: string;
    }
) => {
    const res = await axiosInstance.post(`/comment/${postId}`, data);
    return res.data;
};

// POST /comment/remove/:id
export const deleteComment = async (id: string) => {
    const res = await axiosInstance.delete(`/comment/${id}`);
    return res.data;
};
