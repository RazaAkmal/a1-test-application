import axios from 'axios';

const baseURL = 'https://3.93.15.104';

const instance = axios.create({
  baseURL
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
