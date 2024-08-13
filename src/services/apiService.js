import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your actual backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const calculateFuel = (data) => {
  return apiClient.post('/calculate-fuel', data);
};

export const saveTreasureMap = (data) => {
  return apiClient.post('/save-map', data);
};

export const getTreasureMap = (mapId) => {
  return apiClient.get(`/get-map/${mapId}`);
};
