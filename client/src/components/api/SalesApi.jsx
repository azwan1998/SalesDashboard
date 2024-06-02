import axios from 'axios';
import API_BASE_URL from '../../config';

const API_URL = `${API_BASE_URL}/sales`;

export const fetchSalesData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching sales data:', error.message);
    console.error('Error details:', error);
    throw error;
  }
};

export const createSalesData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/store`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating sales data:', error.message);
    console.error('Error details:', error);
    throw error;
  }
};

export const updateSalesData = async (id, data) => {  
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating sales data:', error.message);
    console.error('Error details:', error);
    throw error;
  }
};

export const deleteSalesData = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting sales data:', error.message);
    throw error;
  }
};

export const searchSalesData = async (query) => {
  try {
    const response = await axios.get(API_URL, {
      params: { searching: query }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching sales data:', error.message);
    console.error('Error details:', error);
    throw error;
  }
};

export const filterBarangSalesData = async (query) => {
  try {
    const response = await axios.get(API_URL, {
      params: { jenisBarang: query }
    });
    return response.data;
  } catch (error) {
    console.error('Error sales data:', error.message);
    console.error('Error details:', error);
    throw error;
  }
};
