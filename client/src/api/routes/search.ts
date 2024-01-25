import axiosInstance from "../axios";

export const searchUsers = async (query: string) => {
    const res = await axiosInstance.post("/search/users", { query });
    return res.data;
};

export const searchPosts = async (query: string) => {
    const res = await axiosInstance.post("/search/posts", { query });
    return res.data;
};
