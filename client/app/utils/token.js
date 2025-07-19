/**
 *
 * Token Utility
 *
 */

import axios from 'axios';

const setToken = (token) => {
  if (token) {
    // Set default authorization header for all axios requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Remove authorization header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setToken;