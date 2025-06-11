import axios from 'axios';
import { Config } from './Config';

export const api = axios.create({
  baseURL: Config.API_BASE_URL,
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