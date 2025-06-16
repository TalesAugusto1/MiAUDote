import { Prisma } from '@prisma/client';
import { IAdotanteRepository } from '../interfaces/IAdotanteRepository';
import { IUserRepository } from '../interfaces/IUserRepository';

type User = Prisma.UserGetPayload<{}>;

export class UserService {
  constructor(
    private userRepository: IUserRepository,
    private adotanteRepository: IAdotanteRepository
  ) {}

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

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async createUserWithAdotante(data: {
    nome: string;
    email: string;
    senha: string;
    cpf: string;
  }): Promise<{ user: User; adotante: any }> {
    const { nome, email, senha, cpf } = data;

    // Validação do CPF
    if (!this.isValidCPF(cpf)) {
      throw new Error('CPF inválido');
    }

    // Verifica se o email já existe
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    // Cria o usuário
    const user = await this.userRepository.create({ nome, email, senha });

    // Cria o adotante usando o adotanteRepository
    const adotante = await this.adotanteRepository.create({
      cpf,
      user: {
        connect: {
          id: user.id
        }
      }
    });

    return { user, adotante };
  }

  private isValidCPF(cpf: string): boolean {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, '');

    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rest = 11 - (sum % 11);
    let digit1 = rest > 9 ? 0 : rest;
    if (digit1 !== parseInt(cpf.charAt(9))) return false;

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rest = 11 - (sum % 11);
    let digit2 = rest > 9 ? 0 : rest;
    if (digit2 !== parseInt(cpf.charAt(10))) return false;

    return true;
  }

  async createUserWithOng(data: {
    nome: string;
    email: string;
    senha: string;
    cnpj: string;
    endereco: string;
  }): Promise<{ user: User; ong: any }> {
    const { nome, email, senha, cnpj, endereco } = data;
    const user = await this.userRepository.create({ nome, email, senha });
    const ong = await this.userRepository.createOng({
      id: user.id,
      cnpj,
      endereco
    });
    return { user, ong };
  }
}
