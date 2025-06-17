import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../config/api';

interface LoginCredentials {
  email: string;
  senha: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    nome: string;
    email: string;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const loginData = {
        email: credentials.email,
        senha: credentials.senha
      };

      const response = await api.post<LoginResponse>('/user/login', loginData);
      const { token, user } = response.data;
      
      // Salvar token no AsyncStorage
      await AsyncStorage.setItem('@MiAuDote:token', token);
      await AsyncStorage.setItem('@MiAuDote:user', JSON.stringify(user));
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem('@MiAuDote:token');
      await AsyncStorage.removeItem('@MiAuDote:user');
    } catch (error) {
      throw error;
    }
  },

  async getStoredToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('@MiAuDote:token');
    } catch (error) {
      return null;
    }
  },

  async getStoredUser(): Promise<any | null> {
    try {
      const userStr = await AsyncStorage.getItem('@MiAuDote:user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      return null;
    }
  }
}; 