import axios from 'axios';
import API_BASE_URL from '../../config';

const API_URL = `${API_BASE_URL}/kategori`;

export const fetchKategoriBarangData = async () => {
  try {
    const response = await axios.get(`${API_URL}/?jenis_kategori=barang`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sales data:', error.message);
    console.error('Error details:', error);
    throw error;
  }
};

export const fetchKategoriData = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching sales data:', error.message);
    console.error('Error details:', error);
    throw error;
  }
};

export const createKategoriData = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/store`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating sales data:', error.message);
      console.error('Error details:', error);
      throw error;
    }
  };
  
  export const updateKategoriData = async (id, data) => {  
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating sales data:', error.message);
      console.error('Error details:', error);
      throw error;
    }
  };
  
  export const deleteKategoriData = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting sales data:', error.message);
      throw error;
    }
  };
  
  export const filterKategoriData = async (query) => {
    try {
      const response = await axios.get(API_URL, {
        params: { jenis_kategori: query }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error filter sales data:', error.message);
      console.error('Error details:', error);
      throw error;
    }
  };
  
