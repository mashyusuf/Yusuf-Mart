import { useEffect } from 'react';
import axios from 'axios';

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default function useAxiosSecure() {
  useEffect(() => {
    // Intercept requests to include JWT token
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });
  }, []);

  return axiosSecure;
}
