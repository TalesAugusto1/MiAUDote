import { User } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../interfaces/IUserRepository';

const SECRET_KEY = process.env.JWT_SECRET || 'miAuDoteSecret';

export class AuthService {
  constructor(private userRepository: IUserRepository) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;

    const isValid = await bcryptjs.compare(password, user.senha);
    if (!isValid) return null;

    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password, salt);
  }

  async register(data: { name: string; email: string; password: string }) {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const hashedPassword = await this.hashPassword(data.password);
    const user = await this.userRepository.create({
      nome: data.name,
      email: data.email,
      senha: hashedPassword
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: '24h' }
    );

    return { token, user };
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: '24h' }
    );

    return { token, user };
  }

  async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as { id: number; email: string };
      const user = await this.userRepository.findById(decoded.id);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      return user;
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
}
