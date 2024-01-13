import axiosInstance from "../axios";

// GET /post/:id
export const getPost = async (id: string) => {
    const res = await axiosInstance.get(`/post/${id}`);
    return res.data;
};

// POST /post
export const createPost = async (data: PostForm) => {
    const res = await axiosInstance.post("/post", data);
    return res.data;
};

// POST /post/:id
export const updatePost = async (id: string, data: Partial<Post>) => {
    const res = await axiosInstance.post(`/post/${id}`, data);
    return res.data;
};

// DELETE /post/:id
export const deletePost = async (id: string) => {
    const res = await axiosInstance.delete(`/post/${id}`);
    return res.data;
};

// For the Feed
export const getAllPosts = async () => {
    const res = await axiosInstance.get("/post/feed/all");
    return res.data;
};

export const getAllFollowerPosts = async (id: string) => {
    const res = await axiosInstance.get(`/post/feed/${id}`);
    return res.data;
};
