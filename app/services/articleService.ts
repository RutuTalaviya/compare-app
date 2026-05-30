import { apiInstance } from "./api";

/**
 * Get all articles for admin / client list
 */
export const getArticles = async (start: number = 1, limit: number = 100) => {
  try {
    const response = await apiInstance.get("/admin/article/get", {
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

/**
 * Get grouped glossary articles
 */
export const getGroupedArticles = async () => {

  try {

    const response = await apiInstance.get(
      "/client/article/getGroupedArticles"
    );

    return response;

  } catch (error) {

    throw error;

  }

};

/**
 * Search articles
 */
export const searchArticles = async (
  searchString: string
) => {

  try {

    const response = await apiInstance.get(
      "/client/article/searchArticle",
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

/**
 * Get article details
 */
export const getArticleDetails = async (
  uniqueTitle: string
) => {

  try {

    const response = await apiInstance.get(
      "/client/article/detilasOfArticle",
      {
        params: {
          uniqueTitle,
        },
      }
    );

    return response;

  } catch (error) {

    throw error;

  }

};