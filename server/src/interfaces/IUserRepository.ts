import { User, UserPreferences } from '@prisma/client';

export interface IUserRepository {
  create(data: {
    name: string;
    email: string;
    password: string;
    profilePicture?: string;
  }): Promise<User>;
  
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  update(id: number, data: Partial<User>): Promise<User>;
  delete(id: number): Promise<void>;
  updatePreferences(userId: number, preferences: Partial<UserPreferences>): Promise<UserPreferences>;
} 