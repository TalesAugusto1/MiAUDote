import axios from 'axios';
import { Config } from './Config';

export const api = axios.create({
  baseURL: Config.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requisições
api.interceptors.request.use(
  (config) => {
    console.log('🚀 Requisição:', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para respostas
api.interceptors.response.use(
  (response) => {
    console.log('✅ Resposta:', {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('❌ Erro na resposta:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Erro na requisição';
    return Promise.reject(new Error(errorMessage));
  }
); 