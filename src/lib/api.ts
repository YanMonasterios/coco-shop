import axios from 'axios';

// Asumimos que tu backend Next.js corre en el puerto 3000
const API_URL = 'http://localhost:3000/api'; 

export const api = axios.create({
  baseURL: API_URL,
});

// Interceptor: Inyectar el Token en cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor: Manejar errores globales (401, 403)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el token expiró o es inválido, cerramos sesión
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Opcional: Redirigir al login aquí o dejar que el AuthContext lo maneje
      // window.location.href = '/auth/login'; 
    }
    return Promise.reject(error);
  }
);
