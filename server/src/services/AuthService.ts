import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../interfaces/IUserRepository';

interface User {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

const SECRET_KEY = process.env.JWT_SECRET || 'miAuDoteSecret';

export class AuthService {
  constructor(private userRepository: IUserRepository) {}

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

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.senha);
    if (!isValid) return null;

    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET_KEY,
      { expiresIn: '24h' }
    );

    return { token };
  }

  async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY) as { id: number; email: string };
      const user = await this.userRepository.findById(decoded.id);
      if (!user) throw new Error('Usuário não encontrado');
      return user;
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
}
