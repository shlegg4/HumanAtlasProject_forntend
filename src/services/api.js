// src/services/api.js
import axios from 'axios';

// Set up a base URL for your API
const API_BASE_URL = 'http://localhost:4000'; // Replace with your actual API URL



// Search for a WSI (wholse slide image)
export const searchForWSI = async (image_url, boundary) => {
  try {
    if (typeof boundary === 'string') {
      boundary = JSON.parse(boundary); 
    }
    console.log(boundary);
    const response = await axios.post(`${API_BASE_URL}/search`, {
      image_url: image_url,
      boundary: boundary
    });

    console.log('API Response:', response.data)
    return response.data;
  } catch (error) {
    console.error(`Error searching for Image ${image_url}:`, error);
    throw error;
  }
};


// Example: Function to update an item (PUT request)
// export const updateItem = async (id, updatedData) => {
//   try {
//     const response = await api.put(`/posts/${id}`, updatedData);
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating item with id ${id}:`, error);
//     throw error;
//   }
// };
