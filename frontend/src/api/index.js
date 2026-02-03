import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers:{
    "Content-Type": "application/json",
    Accept: "application/json"
  }
})

const APIAuthenticatedClient = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    }
})

APIAuthenticatedClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
},
(error) => {
    return Promise.reject(error);
});

export { apiClient, APIAuthenticatedClient };