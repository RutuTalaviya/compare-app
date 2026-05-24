import { apiInstance } from "./api";

/**
 * Search products
 */
export const searchProducts = async (searchString: string) => {
  try {
    const response = await apiInstance.get(
      `/client/product/searchData`,
      {
        params: {
          searchString,
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};