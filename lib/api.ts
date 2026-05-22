// Fetch the base URL from environment variables
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

/**
 * A reusable fetch wrapper to automatically prepend the base URL
 * and handle default headers.
 */
export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  // Ensure the endpoint starts with a slash
  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  // Default headers (e.g., for JSON requests)
  const defaultHeaders = {
    "Content-Type": "application/json",
    // You can add authorization tokens here later if needed
    // "Authorization": `Bearer ${token}`
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  // Handle HTTP errors globally
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};