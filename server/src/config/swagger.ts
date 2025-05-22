import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MiAUDote API',
      version: '1.0.0',
      description: 'API para o aplicativo MiAUDote',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Localhost',
      },
      {
        url: 'http://192.168.1.7:3333',
        description: 'Rede local',
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
    },
  },
  apis: ['./src/controllers/**/*.ts'], // Caminho atualizado para incluir subpastas
};

export const swaggerSpec = swaggerJsdoc(options); 