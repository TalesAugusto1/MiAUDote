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

// Animal
import { AnimalController } from './controllers/AnimalController';
import { PrismaAnimalRepository } from './repositories/PrismaAnimalRepository';
import { AnimalService } from './services/AnimalService';

// Adocao
import { AdocaoController } from './controllers/AdocaoController';
import { PrismaAdocaoRepository } from './repositories/PrismaAdocaoRepository';
import { AdocaoService } from './services/AdocaoService';

// Formulario
import { FormularioController } from './controllers/FormularioController';
import { PrismaFormularioRepository } from './repositories/PrismaFormularioRepository';
import { FormularioService } from './services/FormularioService';

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
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

// Animal
const animalRepository = new PrismaAnimalRepository();
const animalService = new AnimalService(animalRepository);
const animalController = new AnimalController(animalService);

// Adocao
const adocaoRepository = new PrismaAdocaoRepository();
const adocaoService = new AdocaoService(adocaoRepository);
const adocaoController = new AdocaoController(adocaoService);

// Formulario
const formularioRepository = new PrismaFormularioRepository();
const formularioService = new FormularioService(formularioRepository);
const formularioController = new FormularioController(formularioService);

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

// Rotas Animal
app.post('/animais', (req, res) => animalController.create(req, res));
app.get('/animais/:id', (req, res) => animalController.getById(req, res));
app.get('/animais', (req, res) => animalController.getByOngId(req, res));
app.put('/animais/:id', (req, res) => animalController.update(req, res));
app.delete('/animais/:id', (req, res) => animalController.delete(req, res));

// Rotas Adocao
app.post('/adocoes', (req, res) => adocaoController.create(req, res));
app.get('/adocoes/:id', (req, res) => adocaoController.getById(req, res));
app.get('/adocoes', (req, res) => {
  if (req.query.adotanteId) return adocaoController.getByAdotanteId(req, res);
  if (req.query.ongId) return adocaoController.getByOngId(req, res);
  if (req.query.animalId) return adocaoController.getByAnimalId(req, res);
  return res.status(400).json({ error: 'Parâmetro de busca não informado.' });
});
app.put('/adocoes/:id', (req, res) => adocaoController.update(req, res));
app.delete('/adocoes/:id', (req, res) => adocaoController.delete(req, res));

// Rotas Formulario
app.post('/formularios', (req, res) => formularioController.create(req, res));
app.get('/formularios/:id', (req, res) => formularioController.getById(req, res));
app.get('/formularios', (req, res) => formularioController.getByAdotanteUserId(req, res));
app.put('/formularios/:id', (req, res) => formularioController.update(req, res));
app.delete('/formularios/:id', (req, res) => formularioController.delete(req, res));

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 Documentação disponível em http://localhost:${PORT}/api-docs`);
}); 