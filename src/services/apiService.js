import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add the token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// Interceptor to handle 401 and 403 errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {

    const isLoginPath = error.config.url.includes("authentication/login");
    if (
      !isLoginPath && 
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      handleUnauthorized();
    }
    return Promise.reject(error);
  }
);
export const handleUnauthorized = () => {
  localStorage.removeItem("jwtToken");
  window.location.href = "/"; // Redirect to login page or root
};

// Function to log in and store the token
export const login = async (username, password) => {
  const response = await apiClient.post("/authentication/login", {
    Username: username,
    Password: password,
  });

  if (response.data && response.data.access_token) {
    localStorage.setItem("jwtToken", response.data.access_token);
  }

  return response.data;
};

// Function to register a new user
export const register = async (username, email, password) => {
  const response = await apiClient.post("/authentication/register", {
    Username: username,
    Email: email,
    Password: password,
  });

  if (response.data && response.data.access_token) {
    localStorage.setItem("jwtToken", response.data.access_token);
  }

  return response.data;
};

// Function to calculate fuel after creating TreasureMap
export const calculateFuel = (data) => {
  return apiClient.post("/TreasureMaps/calculate", data);
};

export const registerUser = (userData) => {
  return axios.post("/api/auth/register", userData); // Adjust the endpoint according to your backend API
};
export const fetchPreviousResults = () => {
  return apiClient.get("/Results"); // Adjust the endpoint as necessary
};
export const fetchMapByMapId = (mapId) => {
  return apiClient.get(`/TreasureMaps/${mapId}`); // Adjust the endpoint as necessary
};
