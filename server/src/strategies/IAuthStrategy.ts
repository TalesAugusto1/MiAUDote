export interface IAuthStrategy {
  authenticate(credentials: {
    email: string;
    password: string;
  }): Promise<{
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
      profilePicture?: string;
    };
  }>;
} 