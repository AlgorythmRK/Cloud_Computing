// src/config/api.js

const BASE_URL = import.meta.env.VITE_API_URL;

export const API_BASE_URL = BASE_URL || "http://localhost:5000"; 

// Attach auth headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
