import axios from 'axios';
import API_BASE_URL from '../../config';

const API_URL = `${API_BASE_URL}/sales`;

export const fetchSalesData = async (filters) => {
  try {
    const response = await axios.get(API_URL, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching sales data:', error);
    throw error;
  }
};

export const countData = async () => {
    try {
      const response = await axios.get(`${API_URL}/count`);
      return response.data;
    } catch (error) {
      console.error('Error deleting sales data:', error.message);
      throw error;
    }
};