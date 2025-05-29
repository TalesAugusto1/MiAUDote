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
            id: { 
              type: 'integer',
              description: 'ID do usuário (gerado automaticamente)'
            },
            nome: { 
              type: 'string',
              description: 'Nome do usuário'
            },
            email: { 
              type: 'string',
              description: 'Email do usuário (único)'
            },
            senha: { 
              type: 'string',
              description: 'Senha do usuário'
            },
            adotante: { 
              type: 'object',
              description: 'Dados do adotante',
              properties: {
                id: { type: 'integer' },
                cpf: { type: 'string' },
                dataNascimento: { type: 'string', format: 'date-time' }
              }
            },
            ong: { 
              type: 'object',
              description: 'Dados da ONG',
              properties: {
                id: { type: 'integer' },
                cnpj: { type: 'string' },
                endereco: { type: 'string' }
              }
            }
          }
        },
        Adotante: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            cpf: { type: 'string' },
            dataNascimento: { type: 'string', format: 'date-time' },
            user: { $ref: '#/components/schemas/User' }
          }
        },
        Ong: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            cnpj: { type: 'string' },
            endereco: { type: 'string' },
            user: { $ref: '#/components/schemas/User' }
          }
        },
        Animal: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nome: { type: 'string' },
            tipo: { type: 'string' },
            sexo: { type: 'string' },
            idade: { type: 'integer' },
            porte: { type: 'string' },
            raca: { type: 'string' },
            idOng: { type: 'integer' }
          }
        },
        Adocao: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            idAdotante: { type: 'integer' },
            idAnimal: { type: 'integer' },
            dataSolicitacao: { type: 'string', format: 'date-time' },
            status: { type: 'string' }
          }
        },
        Formulario: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            idAdotante: { type: 'integer' },
            nomeAdotante: { type: 'string' },
            ongResponsavel: { type: 'string' },
            dataEnvio: { type: 'string', format: 'date-time' }
          }
        }
      },
      paths: {
        '/user': {
          get: {
            tags: ['User'],
            summary: 'Lista todos os usuários',
            responses: {
              200: {
                description: 'Lista de usuários',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        oneOf: [
                          { $ref: '#/components/schemas/User' },
                          { $ref: '#/components/schemas/UserWithAdotante' },
                          { $ref: '#/components/schemas/UserWithOng' }
                        ]
                      }
                    }
                  }
                }
              }
            }
          },
          post: {
            tags: ['User'],
            summary: 'Cria um novo usuário',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['nome', 'email', 'senha'],
                    properties: {
                      nome: { type: 'string' },
                      email: { type: 'string' },
                      senha: { type: 'string' }
                    }
                  }
                }
              }
            },
            responses: {
              201: {
                description: 'Usuário criado com sucesso',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/User'
                    }
                  }
                }
              }
            }
          }
        },
        '/user/adotante': {
          post: {
            tags: ['User'],
            summary: 'Cria um novo usuário e um adotante',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['nome', 'email', 'senha', 'cpf', 'dataNascimento'],
                    properties: {
                      nome: { type: 'string' },
                      email: { type: 'string' },
                      senha: { type: 'string' },
                      cpf: { type: 'string' },
                      dataNascimento: { type: 'string', format: 'date-time' }
                    }
                  }
                }
              }
            },
            responses: {
              201: {
                description: 'Usuário e adotante criados com sucesso',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        user: { $ref: '#/components/schemas/User' },
                        adotante: { $ref: '#/components/schemas/Adotante' }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        '/user/ong': {
          post: {
            tags: ['User'],
            summary: 'Cria um novo usuário e uma ONG',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['nome', 'email', 'senha', 'cnpj', 'endereco'],
                    properties: {
                      nome: { type: 'string' },
                      email: { type: 'string' },
                      senha: { type: 'string' },
                      cnpj: { type: 'string' },
                      endereco: { type: 'string' }
                    }
                  }
                }
              }
            },
            responses: {
              201: {
                description: 'Usuário e ONG criados com sucesso',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        user: { $ref: '#/components/schemas/User' },
                        ong: { $ref: '#/components/schemas/Ong' }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        '/adotante': {
          get: {
            tags: ['Adotante'],
            summary: 'Lista todos os adotantes',
            responses: {
              200: {
                description: 'Lista de adotantes',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Adotante'
                      }
                    }
                  }
                }
              }
            }
          }
        },
        '/adotante/{id}': {
          get: {
            tags: ['Adotante'],
            summary: 'Busca um adotante por ID',
            parameters: [
              {
                nome: 'id',
                in: 'path',
                required: true,
                schema: {
                  type: 'integer'
                }
              }
            ],
            responses: {
              200: {
                description: 'Dados do adotante',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Adotante'
                    }
                  }
                }
              }
            }
          }
        },
        '/ong': {
          get: {
            tags: ['Ong'],
            summary: 'Lista todas as ONGs',
            responses: {
              200: {
                description: 'Lista de ONGs',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Ong'
                      }
                    }
                  }
                }
              }
            }
          }
        },
        '/ong/{id}': {
          get: {
            tags: ['Ong'],
            summary: 'Busca uma ONG por ID',
            parameters: [
              {
                nome: 'id',
                in: 'path',
                required: true,
                schema: {
                  type: 'integer'
                }
              }
            ],
            responses: {
              200: {
                description: 'Dados da ONG',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Ong'
                    }
                  }
                }
              }
            }
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
