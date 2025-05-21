import { hash } from 'bcryptjs';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IAuthStrategy } from '../strategies/IAuthStrategy';

export class AuthService {
  constructor(
    private userRepository: IUserRepository,
    private authStrategy: IAuthStrategy
  ) {}

  async register(data: {
    name: string;
    email: string;
    password: string;
    profilePicture?: string;
  }) {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const hashedPassword = await hash(data.password, 8);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    };
  }

  async login(credentials: { email: string; password: string }) {
    return this.authStrategy.authenticate(credentials);
  }
} 