import { apiInstance } from "./api";

export const getSetting = async () => {
    return apiInstance.get(`admin/setting/getSetting`);
};