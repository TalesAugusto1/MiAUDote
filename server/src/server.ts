import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import { AdocaoController } from './controllers/AdocaoController';
import { AnimalController } from './controllers/AnimalController';
import { FormularioController } from './controllers/FormularioController';
import { UserController } from './controllers/UserController';

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Inicialização dos controllers
const userController = new UserController();
const animalController = new AnimalController();
const adocaoController = new AdocaoController();
const formularioController = new FormularioController();

// Rotas de teste
app.get('/user', userController.findAll.bind(userController));
app.post('/user/test', userController.createTest.bind(userController));

app.get('/animal', animalController.findAll.bind(animalController));
app.post('/animal/test', animalController.createTest.bind(animalController));

app.get('/adocao', adocaoController.findAll.bind(adocaoController));
app.post('/adocao/test', adocaoController.createTest.bind(adocaoController));

app.get('/formulario', formularioController.findAll.bind(formularioController));
app.post('/formulario/test', formularioController.createTest.bind(formularioController));

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 Documentação disponível em http://localhost:${PORT}/api-docs`);
}); 