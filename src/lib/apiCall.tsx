// import { API_URL } from "./constant";
// import { API_REACT_URL } from "./url";

import tokenInterceptor from "../lib/tokenInterceptor";

const API_BASE_URL = `https://use-parking-appserver.vercel.app`;

const api = tokenInterceptor();

interface ApiCallOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  body?: unknown;
  headers?: Record<string, string>;
}

const apiCall = async ({
  method = "GET",
  endpoint,
  body,
  headers = {},
}: ApiCallOptions) => {
  try {
    const response = await api.request({
      url: `${API_BASE_URL}${endpoint}`,
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        ...headers,
      },
      data: body, // Axios uses `data` instead of `body`
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default apiCall;
