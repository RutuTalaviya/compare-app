import { apiInstance } from "./api";

// Get Categories API
export const getCategories = async (
  start: number = 1,
  limit: number = 10
) => {
  try {
    const response = await apiInstance.get("/admin/category/get", {
      params: {
        start,
        limit,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};