import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { AuthController } from './controllers/AuthController';
import { PrismaUserRepository } from './repositories/PrismaUserRepository';
import { AuthService } from './services/AuthService';
import { JwtAuthStrategy } from './strategies/JwtAuthStrategy';

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

// Rotas
app.post('/auth/register', (req, res) => authController.register(req, res));
app.post('/auth/login', (req, res) => authController.login(req, res));

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 Documentação disponível em http://192.168.1.7:${PORT}/api-docs`);
}); 