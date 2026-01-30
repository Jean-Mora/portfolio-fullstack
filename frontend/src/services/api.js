// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // ajusta si usas .env
  headers: { 'Content-Type': 'application/json' },
});

// ← Este interceptor envía el token en TODAS las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  // o sessionStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token enviado:', config.headers.Authorization); // debug temporal
    } else {
      console.log('No hay token en localStorage');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;