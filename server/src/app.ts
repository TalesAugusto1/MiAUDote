import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rotas da aplicação
app.use('/api', routes);

export default app; 