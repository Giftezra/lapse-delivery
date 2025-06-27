import { fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import store from "../store";
import { logout, refreshTokenSuccess} from "../slices/authSlice";

// Create axios instance for RTK Query
const baseURL = "https://6d6d-213-233-155-134.ngrok-free.app";

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const access = state.auth.access;

    if (access && config.headers) {
      config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const state = store.getState();
        const refresh = state.auth.refresh;

        if (!refresh) {
          store.dispatch(logout());
          return Promise.reject(error);
        }

        const refreshResponse = await axios.post(
          `${baseURL}/api/v1/auth/refresh`,
          {
            refresh_token: refresh,
          }
        );

        const { token: newToken, refresh_token: newRefreshToken } =
          refreshResponse.data;

        store.dispatch(
          refreshTokenSuccess({
            access: newToken,
            refresh: newRefreshToken,
          })
        );

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Custom base query for RTK Query using axios
export const axiosBaseQuery = (): BaseQueryFn => {
  return async ({ url, method, data, params, headers }) => {
    try {
      const config: AxiosRequestConfig = {
        url,
        method,
        data,
        params,
        headers,
      };

      const response: AxiosResponse = await axiosInstance(config);

      return {
        data: response.data,
        meta: {
          response: response,
        },
      };
    } catch (error) {
      const axiosError = error as AxiosError;

      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };
};

export default axiosBaseQuery;
