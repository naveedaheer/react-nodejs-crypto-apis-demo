import axios from 'axios';

/**
 * Configuration for all API calls
 */
export const API = axios.create({
  // baseURL: 'http://localhost:8000',
  baseURL: 'https://order-book-server.herokuapp.com',
});

/**
 * Default headers for POST calls
 */
// API.defaults.headers.post['Content-Type'] = 'application/json';

