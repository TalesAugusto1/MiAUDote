import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API MiAuDote',
      version: '1.0.0',
      description: 'API para o sistema de adoção de animais MiAuDote',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            email: { type: 'string' },
            name: { type: 'string' },
            password: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        UserPreferences: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            userId: { type: 'integer' },
            notifications: { type: 'boolean' },
            emailUpdates: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Ong: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            address: { type: 'string' },
            phone: { type: 'string' },
            userId: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Animal: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            species: { type: 'string' },
            breed: { type: 'string' },
            age: { type: 'integer' },
            description: { type: 'string' },
            imageUrl: { type: 'string' },
            status: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Adocao: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            animalId: { type: 'integer' },
            adotanteId: { type: 'integer' },
            ongId: { type: 'integer' },
            status: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Formulario: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            idAdotante: { type: 'integer' },
            nomeAdotante: { type: 'string' },
            ongResponsavel: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  },
  apis: [
    path.join(__dirname, '../controllers/*.ts'),
    path.join(__dirname, '../controllers/**/*.ts')
  ],
};

export const specs = swaggerJsdoc(options);
