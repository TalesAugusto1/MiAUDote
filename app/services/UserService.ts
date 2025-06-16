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
  telefone: string;
}

// Strategy interface
export interface IUserRegistrationStrategy {
  register(userData: IUserData, specificData: any): Promise<any>;
}

// Concrete strategy para Adotante
export class AdotanteRegistrationStrategy implements IUserRegistrationStrategy {
  async register(userData: IUserData, adotanteData: IAdotanteData) {
    try {
      // Prepara os dados para o cadastro no formato que a API espera
      const registerData = {
        nome: userData.name,
        email: userData.email,
        senha: userData.password,
        cpf: adotanteData.cpf,
        formRespondido: adotanteData.formRespondido,
        tipo: 'ADOTANTE'  // Adicionando o tipo de usuário
      };

      console.log('Dados sendo enviados:', registerData);

      // Realiza o cadastro
      const registerResponse = await api.post('/user/adotante', registerData);

      if (!registerResponse.data) {
        throw new Error('Erro ao processar resposta do servidor');
      }

      return {
        success: true,
        data: registerResponse.data
      };
    } catch (error: any) {
      console.error('Erro no registro:', error);
      
      // Verifica se o erro é de email duplicado
      if (error.response?.status === 409 || error.message?.includes('email já cadastrado')) {
        return {
          success: false,
          message: 'Este email já está cadastrado'
        };
      }

      // Verifica se é erro de campos obrigatórios
      if (error.response?.status === 400) {
        return {
          success: false,
          message: error.response.data.error || 'Todos os campos são obrigatórios'
        };
      }

      return {
        success: false,
        message: error.message || 'Erro ao registrar adotante'
      };
    }
  }
}

// Concrete strategy para ONG
export class OngRegistrationStrategy implements IUserRegistrationStrategy {
  async register(userData: IUserData, ongData: IOngData) {
    try {
      // Prepara os dados para o cadastro no formato que a API espera
      const registerData = {
        nome: userData.name,
        email: userData.email,
        senha: userData.password,
        cnpj: ongData.cnpj,
        endereco: ongData.endereco,
        telefone: ongData.telefone
      };

      console.log('Dados sendo enviados:', registerData);

      // Realiza o cadastro
      const registerResponse = await api.post('/user/ong', registerData);

      if (!registerResponse.data) {
        throw new Error('Erro ao processar resposta do servidor');
      }

      return {
        success: true,
        data: registerResponse.data
      };
    } catch (error: any) {
      console.error('Erro no registro:', error);
      
      // Verifica se o erro é de email duplicado
      if (error.response?.status === 409 || error.message?.includes('email já cadastrado')) {
        return {
          success: false,
          message: 'Este email já está cadastrado'
        };
      }

      // Verifica se é erro de campos obrigatórios
      if (error.response?.status === 400) {
        return {
          success: false,
          message: error.response.data.error || 'Todos os campos são obrigatórios'
        };
      }

      // Verifica se é erro do servidor
      if (error.response?.status === 500) {
        return {
          success: false,
          message: 'Erro interno do servidor. Por favor, tente novamente mais tarde.'
        };
      }

      return {
        success: false,
        message: error.message || 'Erro ao registrar ONG'
      };
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