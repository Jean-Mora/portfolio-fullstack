// src/services/api.js
import axios from 'axios';

const api = axios.create({
  // Si existe la variable de entorno, la usa; si no (en local), usa localhost
  baseURL: process.env.REACT_APP_API_URL 
    ? `${process.env.REACT_APP_API_URL}/api` 
    : 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

// ← Este interceptor envía el token en TODAS las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log('Token enviado:', config.headers.Authorization); // opcional
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;