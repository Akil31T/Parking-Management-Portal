import axios from "axios";

const tokenInterceptor = () => {
  const instance = axios.create({
    baseURL: "https://use-parking-appserver.vercel.app", // Set base URL globally
  });

  instance.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

export default tokenInterceptor;
