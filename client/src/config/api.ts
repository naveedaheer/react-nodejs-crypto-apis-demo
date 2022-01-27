import axios from 'axios';

/**
 * Configuration for all API calls
 */
export const API = axios.create({
  baseURL: 'http://localhost:8000',
});

/**
 * Default headers for POST calls
 */
// API.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * The below code runs for every endpoint request
 */

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      console.log("Unauthorized")
    }
    return Promise.reject(error);
  },
);
