import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IAuthStrategy } from './IAuthStrategy';

export class JwtAuthStrategy implements IAuthStrategy {
  constructor(
    private userRepository: IUserRepository,
    private jwtSecret: string
  ) {}

  async authenticate(credentials: {
    email: string;
    senha: string;
  }): Promise<{
    token: string;
    user: {
      id: number;
      nome: string;
      email: string;
    };
  }> {
    const user = await this.userRepository.findByEmail(credentials.email);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const passwordMatch = await compare(credentials.senha, user.senha);

    if (!passwordMatch) {
      throw new Error('Senha incorreta');
    }

    const token = sign(
      {
        id: user.id,
        email: user.email,
      },
      this.jwtSecret,
      {
        expiresIn: '1d',
      }
    );

    return {
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
    };
  }
} 