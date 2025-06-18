import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express, { RequestHandler, Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import { AdocaoController } from './controllers/AdocaoController';
import { AdotanteController } from './controllers/AdotanteController';
import { AnimalController } from './controllers/AnimalController';
import { FormularioController } from './controllers/FormularioController';
import { OngController } from './controllers/OngController';
import { UserController } from './controllers/UserController';
import { PrismaAdocaoRepository } from './repositories/PrismaAdocaoRepository';
import { PrismaAdotanteRepository } from './repositories/PrismaAdotanteRepository';
import { PrismaAnimalRepository } from './repositories/PrismaAnimalRepository';
import { PrismaFormularioRepository } from './repositories/PrismaFormularioRepository';
import { PrismaOngRepository } from './repositories/PrismaOngRepository';
import { PrismaUserRepository } from './repositories/PrismaUserRepository';
import { AdocaoService } from './services/AdocaoService';
import { AdotanteService } from './services/AdotanteService';
import { AnimalService } from './services/AnimalService';
import { FormularioService } from './services/FormularioService';
import { OngService } from './services/OngService';
import { UserService } from './services/UserService';

const app = express();
const router = Router();
const prisma = new PrismaClient();

// Tratamento de erros não capturados
process.on('uncaughtException', (error) => {
  console.error('Erro não capturado:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Promessa rejeitada não tratada:', error);
});

// Repositories
const userRepository = new PrismaUserRepository(prisma);
const adotanteRepository = new PrismaAdotanteRepository(prisma);
const ongRepository = new PrismaOngRepository(prisma);
const animalRepository = new PrismaAnimalRepository(prisma);
const adocaoRepository = new PrismaAdocaoRepository(prisma);
const formularioRepository = new PrismaFormularioRepository(prisma);

// Services
const userService = new UserService(userRepository, adotanteRepository);
const adotanteService = new AdotanteService(adotanteRepository);
const ongService = new OngService(ongRepository);
const animalService = new AnimalService(animalRepository);
const adocaoService = new AdocaoService(adocaoRepository);
const formularioService = new FormularioService(formularioRepository);

// Controllers
const userController = new UserController(userService);
const adotanteController = new AdotanteController(adotanteService);
const ongController = new OngController(ongService);
const animalController = new AnimalController(animalService);
const adocaoController = new AdocaoController(adocaoService);
const formularioController = new FormularioController(formularioService);

app.use(cors());
app.use(express.json());

// Middleware de log
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Middleware de tratamento de erros
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro na aplicação:', err);
  res.status(500).json({
    error: 'Erro interno do servidor',
    details: err.message
  });
});

// Configuração do Swagger
const swaggerOptions = {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "MiAuDote API Documentation"
};

// @ts-ignore - Ignorando erro de tipagem do Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerOptions));

// Endpoint de versão
app.get('/version', (req, res) => {
  res.json({
    version: '1.0.0',
    lastUpdate: new Date().toISOString(),
    status: 'running'
  });
});

// Rotas de usuário
app.post('/user', userController.create.bind(userController));
app.post('/user/adotante', userController.createWithAdotante.bind(userController));
app.post('/user/ong', userController.createWithOng.bind(userController));
app.get('/user', userController.findAll.bind(userController));
app.get('/user/email/:email', userController.findByEmail.bind(userController));
app.get('/user/:id', userController.findById.bind(userController));

// Rotas de adotante
app.get('/adotante', adotanteController.findAll.bind(adotanteController));
app.get('/adotante/:id', adotanteController.getById.bind(adotanteController));
app.delete('/adotante/:id', adotanteController.delete.bind(adotanteController));

// Rotas de ONG
app.get('/ong', ongController.findAll.bind(ongController));
app.get('/ong/:id', ongController.getById.bind(ongController));
app.delete('/ong/:id', ongController.delete.bind(ongController));

// Rotas de animal
app.get('/animal', animalController.findAll.bind(animalController));
app.get('/animal/:id', animalController.findById.bind(animalController));
app.post('/animal', animalController.create.bind(animalController));

// Rotas de adoção
app.get('/adocao', adocaoController.findAll.bind(adocaoController));

// Rotas de formulário
app.get('/formulario', formularioController.findAll.bind(formularioController));

// Rota para listar tudo
const listAllHandler: RequestHandler = async (req, res) => {
  try {
    const [users, animais, adocoes, formularios] = await Promise.all([
      userService.findAll(),
      animalService.findAll(),
      adocaoService.findAll(),
      formularioService.findAll()
    ]);

    res.json({
      users,
      animais,
      adocoes,
      formularios
    });
  } catch (error) {
    console.error('Erro ao listar todos os dados:', error);
    res.status(500).json({ 
      error: 'Erro ao listar todos os dados',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
};

app.get('/all', listAllHandler);

app.use(router);

const PORT = process.env.PORT || 3333;

const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 Documentação disponível em http://localhost:${PORT}/api-docs`);
});

// Tratamento de encerramento gracioso
process.on('SIGTERM', () => {
  console.log('Recebido SIGTERM. Encerrando servidor...');
  server.close(() => {
    console.log('Servidor encerrado.');
    prisma.$disconnect();
  });
});

process.on('SIGINT', () => {
  console.log('Recebido SIGINT. Encerrando servidor...');
  server.close(() => {
    console.log('Servidor encerrado.');
    prisma.$disconnect();
  });
}); 