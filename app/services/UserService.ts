import { api } from '../config/api';

// Interfaces
export interface IUserData {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
}

export interface IAdotanteData {
  userId: number;
  cpf: string;
  formRespondido: boolean;
}

export interface IOngData {
  userId: number;
  cnpj: string;
  endereco: string;
  whatsapp: string;
}

// Strategy interface
export interface IUserRegistrationStrategy {
  register(userData: IUserData, specificData: any): Promise<any>;
}

// Concrete strategy para Adotante
export class AdotanteRegistrationStrategy implements IUserRegistrationStrategy {
  async register(userData: IUserData, adotanteData: IAdotanteData) {
    try {
      // Primeiro, registra o usuário base
      const registerResponse = await api.post('/auth/register', userData);
      const userId = registerResponse.data.user.id;
      
      // Depois, registra como adotante
      await api.post('/adotantes', {
        ...adotanteData,
        userId,
      });

      return registerResponse.data;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao registrar adotante');
    }
  }
}

// Concrete strategy para ONG
export class OngRegistrationStrategy implements IUserRegistrationStrategy {
  async register(userData: IUserData, ongData: IOngData) {
    try {
      // Primeiro, registra o usuário base
      const registerResponse = await api.post('/auth/register', userData);
      const userId = registerResponse.data.user.id;
      
      // Depois, registra como ONG
      await api.post('/ongs', {
        ...ongData,
        userId,
      });

      return registerResponse.data;
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao registrar ONG');
    }
  }
}

// Context class
export class UserService {
  private strategy: IUserRegistrationStrategy;

  constructor(strategy: IUserRegistrationStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: IUserRegistrationStrategy) {
    this.strategy = strategy;
  }

  async registerUser(userData: IUserData, specificData: any) {
    return this.strategy.register(userData, specificData);
  }
} 