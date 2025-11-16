// src/utils/auth.js

export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};
