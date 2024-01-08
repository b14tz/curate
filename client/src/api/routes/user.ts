// client/src/api/routes/user.ts
import axiosInstance from "../axios";

export const login = async () => {
    const res = await axiosInstance.get(`/auth/google`);
    console.log(res);
    const user: User = { id: "", name: "", token: "" };
    return user;
};
// GET /user/:id
export const getUser = async (id: string) => {
    const res = await axiosInstance.get(`/user/${id}`);
    return res.data;
};

// POST /user
export const createUser = async (data: {}) => {
    const res = await axiosInstance.post("/user", data);
    return res.data;
};

// POST /user/:id
export const updateUser = async (id: string, data: {}) => {
    const res = await axiosInstance.post(`/user/${id}`, data);
    return res.data;
};

// DELETE /user/:id
export const deleteUser = async (id: string) => {
    const res = await axiosInstance.delete(`/user/${id}`);
    return res.data;
};
