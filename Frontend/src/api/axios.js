

import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_DEV_BASE_URL,

    withCredentials: true, // Include cookies in requests
    headers: {
        "Content-Type": "application/json"
    }
});


api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response ?.status === 401) {
            // console.log("Unauthorized - redirect to login later");
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

export default api;