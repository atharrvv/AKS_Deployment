import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

// Create an axios instance
const axiosInstance = axios.create({
  baseURL,  // Use the base URL from the environment variable
//  timeout: 15000, // Set a timeout of 5 seconds for all requests
});

const apiUrl = `/api/products`; // The base part of the URL can stay constant

export const getProducts = async () => {
  try {
    const response = await axiosInstance.get(apiUrl);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createProduct = async (product) => {
  try {
    const response = await axiosInstance.post(apiUrl, product);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateProductById = async (id, product) => {
  try {
    const response = await axiosInstance.put(`${apiUrl}/${id}`, product);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteProductById = async (id) => {
  try {
    const response = await axiosInstance.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Helper function to handle errors
const handleApiError = (error) => {
  if (error.code === "ECONNABORTED") {
    console.error("Request timeout. Please try again later.");
  } else if (error.response) {
    console.error("API error:", error.response.data);
  } else {
    console.error("Unknown error:", error.message);
  }
  throw error;
};
