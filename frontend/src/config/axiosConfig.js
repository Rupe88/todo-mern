import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true; // Enables cookies for requests

axios.interceptors.request.use((config) => {
  // Only set 'Content-Type' to 'application/json' if data is not FormData
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

export default axios;
