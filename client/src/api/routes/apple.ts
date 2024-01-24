import axiosInstance from "../axios";

export const getAppleDeveloperToken = async () => {
    const res = await axiosInstance.get(`/apple/devtoken`);
    return res.data;
};
