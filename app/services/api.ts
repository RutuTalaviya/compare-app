import axios from "axios";
import { BASE_URL, key } from "../config";
import { DangerRight } from "../utils/toast";

// 1. Axios Instance Setup (Recommended for most calls)
export const apiInstance = axios.create({
    baseURL: BASE_URL, 
    headers: {
        "key": key, // Postman mein aapne yahi key dali thi
        "Content-Type": "application/json",
    }
});
console.log("BASE_URL checking:", BASE_URL);
// Response Interceptor
apiInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (typeof window !== "undefined") {
            const errorData = error?.response?.data;
            if (errorData?.code === "E_USER_NOT_FOUND" || errorData?.code === "E_UNAUTHORIZED") {
                localStorage.clear();
                window.location.reload();
            }
            if (errorData?.message) {
                Array.isArray(errorData.message) 
                    ? errorData.message.forEach((msg: string) => DangerRight(msg)) 
                    : DangerRight(errorData.message);
            } else {
                DangerRight("Something went wrong!");
            }
        }
        return Promise.reject(error);
    }
);

// 2. Fetch Wrapper Setup (Updated with proper headers)
const getHeaders = () => ({
    "key": key, 
    "Content-Type": "application/json",
});

export const apiInstanceFetch = {
    get: (url: string) =>
        fetch(`${BASE_URL}${url}`, {
            method: "GET",
            headers: getHeaders(),
        }).then(handleErrors),

    post: (url: string, data: any) =>
        fetch(`${BASE_URL}${url}`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(data),
        }).then(handleErrors),
    
    // ... baaki methods (patch, put, delete) mein bhi getHeaders() use karein
};

// Error Handler for Fetch
async function handleErrors(response: Response) {
    if (!response.ok) {
        const data = await response.json();
        const msg = data.message || "Unexpected error occurred.";
        Array.isArray(msg) ? msg.forEach((m) => DangerRight(m)) : DangerRight(msg);
        return Promise.reject(data);
    }
    return response.json();
}