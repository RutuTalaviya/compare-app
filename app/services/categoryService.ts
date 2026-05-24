import { apiInstance } from "./api";

// Get Categories API
export const getCategories = async (start: number = 1, limit: number = 10) => {
  try {
    const response = await apiInstance.get("/client/category/getCategories");

    return response;
  } catch (error) {
    throw error;
  }
};
