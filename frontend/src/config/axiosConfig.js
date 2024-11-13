import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true; // Enables cookies for requests

axios.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json';
  return config;
});

export default axios;
