import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Ajuste para a URL do seu backend

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.error || 'Erro na requisição';
    return Promise.reject(new Error(errorMessage));
  }
); 