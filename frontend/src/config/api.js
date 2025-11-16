// src/config/api.js

// Read backend URL from Vite environment variables
export const API_BASE_URL = import.meta.env.VITE_API_URL;

// Helper to attach Authorization header
export const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
