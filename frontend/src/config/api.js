// src/config/api.js

// Your backend base URL
export const API_BASE_URL = "http://localhost:5000";

// Helper to automatically attach Authorization header
export const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
