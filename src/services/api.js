// src/services/api.js
import axios from 'axios';

// Set up a base URL for your API
const API_BASE_URL = 'http://127.0.0.1:8000/'; // Replace with your actual API URL

// Create an Axios instance for customized requests
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});


// Search for a WSI (wholse slide image)
export const searchForWSI = async (file_name) => {
  try {
    const response = await api.get(`/search?query=${file_name}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching for Image ${file_name}:`, error);
    throw error;
  }
};


// Example: Function to update an item (PUT request)
export const updateItem = async (id, updatedData) => {
  try {
    const response = await api.put(`/posts/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating item with id ${id}:`, error);
    throw error;
  }
};
