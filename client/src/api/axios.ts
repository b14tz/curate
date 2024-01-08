// client/src/api/axios.ts
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:3300/api",
    headers: {
        common: {
            Authorization: `Bearer ${Cookies.get("token")}` ?? "",
        },
    },
});

export default axiosInstance;
