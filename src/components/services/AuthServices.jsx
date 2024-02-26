import axios from "axios";

// Appel à l'API
const API_BASE_URL = "https://pulso-backend.onrender.com/api/user/";

// Inscrire un utilisateur
export const registerUser = async (email, password, password2, name, tc) => {
  try {
    const response = await axios.post(`${API_BASE_URL}register/`, {
      email,
      password,
      password2,
      name,
      tc,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

// Connecter un utilisateur
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}login/`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

// Fonction pour renouveler le token
export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${API_BASE_URL}refresh-token/`, {
      refresh_token: refreshToken,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

// Fonction de déconnexion de l'utilisateur
export const logoutUser = async (refreshToken, accessToken) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}logout/`,
      {
        refresh_token: refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

// Récupérer les données de l'utilisateur
export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}profile/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};
