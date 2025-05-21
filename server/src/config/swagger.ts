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
        url: 'http://192.168.1.7:3333',
        description: 'Servidor de Desenvolvimento',
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
  apis: ['./src/controllers/*.ts'], // Caminho para os arquivos com as anotações
};

export const swaggerSpec = swaggerJsdoc(options); 