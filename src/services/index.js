/* eslint-disable no-undef */
import axios from 'axios';
import Cookies from 'js-cookie';


const BASE_URL = "http://103.41.247.216:8041/api";

export async function login(payload) {
  return await axios.post(`${BASE_URL}/login`, payload).catch((error) => {
    return error;
  });
}

export async function logout(token) {
  try {
    return await axios.post(`${BASE_URL}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  } catch (error) {
    console.error("Error during logout:", error.response ? error.response.data : error.message);
    return error.response || error;
  }
}

export async function registration(payload) {
  return await axios.post(`${BASE_URL}/register`, payload).catch((error) => {
    return error;
  });
}

export async function verifyRegisterOtp(payload) {
  return await axios.post(`${BASE_URL}/register/verify-otp`, payload).catch((error) => {
    return error;
  });
}
export async function verifyForgotPasswordOtp(payload) {
  return await axios.post(`${BASE_URL}/forgot-password/verify-otp`, payload).catch((error) => {
    return error;
  });
}

export async function sendOtp(payload) {
  return await axios.post(`${BASE_URL}/send-otp`, payload).catch((error) => {
    return error;
  });
}

export async function forgotpassword(payload) {
  return await axios.post(`${BASE_URL}/forgot-password`, payload).catch((error) => {
    return error;
  });
}

export async function changePassword(payload, token) {
  try {
    const response = await axios.post(`${BASE_URL}/change-password`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error("Error in changePassword:", error.response ? error.response.data : error.message);
    return error.response || error;
  }
}

export async function getCategories() {
  const token = Cookies.get('PHPSESSID');
  return await axios
  .get(`${BASE_URL}/categories`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
};

export const getWastesByCategory = async (wasteTypeId) => {
  const token = Cookies.get('PHPSESSID'); // Ambil token
  if (!token) {
    throw new Error("Token tidak ditemukan");
  }

  try {
    const response = await axios.get(`${BASE_URL}/categories/${wasteTypeId}/wastes`, {
      headers: {
        Authorization: `Bearer ${token}`, // Sertakan token di header
      },
    });
    console.log("API Response:", response); // Debugging
    return response.data; // Kembalikan data
  } catch (error) {
    console.error("Error fetching wastes by category:", error);
    if (error.response) {
      console.error("Response data:", error.response.data); // Detail error dari server
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    throw error;
  }
};
  
export const googleLogin = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/google`);
    return response.data;
  } catch (error) {
    console.error("Google Login Error:", error);
    throw error.response?.data || error.message;
  }
};

export const handleGoogleCallback = async (code) => {
  try {
    
    const tokenResponse = await axios.post(`${BASE_URL}/auth/google/callback`, { code });

    const { token } = tokenResponse.data;

    localStorage.setItem("auth_token", token);

    const userInfoResponse = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = userInfoResponse.data;
    console.log("User Info:", user);

    return user;
  } catch (error) {
    console.error("Google Callback Error:", error);
    throw error.response?.data || error.message;
  }
};

export async function getUsers(token) {
  try {
    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error.response?.data || error.message);
    throw error;
  }
}

export const updateProfile = async (formdata) => {
  const token = Cookies.get('PHPSESSID'); 
  try {
    const response = await axios.post(`${BASE_URL}/profile-update`, formdata, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response; 
  } catch (error) {
    console.error('Error updating profile', error);
    throw error; 
  }
};
