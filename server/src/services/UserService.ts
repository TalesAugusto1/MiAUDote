import { IUserRepository } from '../interfaces/IUserRepository';

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(data: any) {
    // Validação, regras de negócio, etc.
    return this.userRepository.create(data);
  }

  async getUserById(id: number) {
    return this.userRepository.findById(id);
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async updateUser(id: number, data: any) {
    return this.userRepository.update(id, data);
  }

  async deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
} 