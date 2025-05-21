import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { AuthController } from './controllers/AuthController';
import { UserController } from './controllers/UserController';
import { PrismaUserRepository } from './repositories/PrismaUserRepository';
import { AuthService } from './services/AuthService';
import { UserService } from './services/UserService';
import { JwtAuthStrategy } from './strategies/JwtAuthStrategy';

// Novos imports para AdotanteUser e OngUser
import { AdotanteUserController } from './controllers/AdotanteUserController';
import { OngUserController } from './controllers/OngUserController';
import { PrismaAdotanteUserRepository } from './repositories/PrismaAdotanteUserRepository';
import { PrismaOngUserRepository } from './repositories/PrismaOngUserRepository';
import { AdotanteUserService } from './services/AdotanteUserService';
import { OngUserService } from './services/OngUserService';

const app = express();

app.use(cors());
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Inicialização das dependências
const userRepository = new PrismaUserRepository();
const authStrategy = new JwtAuthStrategy(userRepository, process.env.JWT_SECRET!);
const authService = new AuthService(userRepository, authStrategy);
const authController = new AuthController(authService);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// AdotanteUser
const adotanteUserRepository = new PrismaAdotanteUserRepository();
const adotanteUserService = new AdotanteUserService(adotanteUserRepository);
const adotanteUserController = new AdotanteUserController(adotanteUserService);

// OngUser
const ongUserRepository = new PrismaOngUserRepository();
const ongUserService = new OngUserService(ongUserRepository);
const ongUserController = new OngUserController(ongUserService);

// Rotas Auth
app.post('/auth/register', (req, res) => authController.register(req, res));
app.post('/auth/login', (req, res) => authController.login(req, res));

// Rotas User
app.post('/users', (req, res) => userController.create(req, res));
app.get('/users/:id', (req, res) => userController.getById(req, res));
app.get('/users', (req, res) => userController.getByEmail(req, res));
app.put('/users/:id', (req, res) => userController.update(req, res));
app.delete('/users/:id', (req, res) => userController.delete(req, res));

// Rotas AdotanteUser
app.post('/adotantes', (req, res) => adotanteUserController.create(req, res));
app.get('/adotantes/:id', (req, res) => adotanteUserController.getById(req, res));
app.get('/adotantes', (req, res) => adotanteUserController.getByUserId(req, res));
app.put('/adotantes/:id', (req, res) => adotanteUserController.update(req, res));
app.delete('/adotantes/:id', (req, res) => adotanteUserController.delete(req, res));

// Rotas OngUser
app.post('/ongs', (req, res) => ongUserController.create(req, res));
app.get('/ongs/:id', (req, res) => ongUserController.getById(req, res));
app.get('/ongs', (req, res) => ongUserController.getByUserId(req, res));
app.put('/ongs/:id', (req, res) => ongUserController.update(req, res));
app.delete('/ongs/:id', (req, res) => ongUserController.delete(req, res));

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 Documentação disponível em http://192.168.1.7:${PORT}/api-docs`);
}); 