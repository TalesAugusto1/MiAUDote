export interface IAuthStrategy {
  authenticate(credentials: {
    email: string;
    senha: string;
  }): Promise<{
    token: string;
    user: {
      id: number;
      nome: string;
      email: string;
    };
  }>;
} 