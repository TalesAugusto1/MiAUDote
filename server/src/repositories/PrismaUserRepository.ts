import { PrismaClient, User, UserPreferences } from '@prisma/client';
import { IUserRepository } from '../interfaces/IUserRepository';

export class PrismaUserRepository implements IUserRepository {
  private prisma = new PrismaClient();

  async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async updatePreferences(
    userId: number,
    preferences: Partial<UserPreferences>
  ): Promise<UserPreferences> {
    return this.prisma.userPreferences.update({
      where: { userId },
      data: preferences,
    });
  }
} 