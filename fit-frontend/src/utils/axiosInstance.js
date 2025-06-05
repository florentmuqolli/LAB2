import axios from "axios";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      console.log("[Axios] Adding access token to headers");
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      (error.response.status === 403 || error.response.status === 401) &&
      error.response.data.message === "Invalid token" &&
      !originalRequest._retry
    ) {
      console.warn("[Axios] Access token expired. Trying refresh token...");

      originalRequest._retry = true;

      try {
        const res = await axiosInstance.post("/auth/refresh-token", null, {
          withCredentials: true,
        });

        const newAccessToken = res.data.accessToken;
        console.log("[Axios] Refresh token succeeded, new access token:", newAccessToken);

        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("[Axios] Refresh token failed:", refreshError);
        toast.error("Session expired, please login again.");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
