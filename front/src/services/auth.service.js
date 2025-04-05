import axios from 'axios';

const API_URL = 'http://localhost:8080/user';

export const authService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`, { username, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};