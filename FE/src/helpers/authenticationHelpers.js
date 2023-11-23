// authenticationHelpers.js

import { endpoint } from "../services/apiEndpoints";
import { authApi } from "../services/axiosConfig";

export const loginUser = async (username, password) => {
  try {
    if (password.length < 8) {
      throw new Error("Passwords must be at least 8 characters.");
    }

    if (username.length < 5 || username.length > 20) {
      throw new Error("Username must be between 5-20 characters.");
    }

    const response = await authApi.post(endpoint.login, {
      user_username: username,
      user_password: password,
    });
    const { accessToken, refreshToken } = response.data;

    setSecureCookie("accessToken", accessToken);
    setSecureCookie("refreshToken", refreshToken);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Helper function to set a secure cookie
const setSecureCookie = (name, value) => {
  document.cookie = `${name}=${value};secure`;
};
