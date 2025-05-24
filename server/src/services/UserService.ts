import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../interfaces/IUserRepository';

type User = PrismaClient['user']['payload']['default'];

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    // Aqui pode fazer validações, hash de senha, etc.
    return this.userRepository.create(data);
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    return this.userRepository.update(id, data);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
