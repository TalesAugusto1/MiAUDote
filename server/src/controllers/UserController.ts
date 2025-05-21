import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  constructor(private userService: UserService) {}

  async create(req: Request, res: Response) {
    const user = await this.userService.createUser(req.body);
    return res.status(201).json(user);
  }

  async getById(req: Request, res: Response) {
    const user = await this.userService.getUserById(Number(req.params.id));
    return res.json(user);
  }

  async getByEmail(req: Request, res: Response) {
    const user = await this.userService.getUserByEmail(req.query.email as string);
    return res.json(user);
  }

  async update(req: Request, res: Response) {
    const user = await this.userService.updateUser(Number(req.params.id), req.body);
    return res.json(user);
  }

  async delete(req: Request, res: Response) {
    await this.userService.deleteUser(Number(req.params.id));
    return res.status(204).send();
  }
} 