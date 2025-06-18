import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';

const isDev = process.env.NODE_ENV !== 'production';
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API MiAuDote',
      version: '1.0.0',
      description: 'API para o sistema de adoção de animais MiAuDote',
      contact: {
        name: 'Suporte MiAuDote',
        email: 'suporte@miaudote.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: process.env.SERVER_URL || 'http://localhost:3333',
        description: 'Servidor da API',
      },
      {
        url: 'https://api.miaudote.com',
        description: 'Servidor de produção',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token de autenticação'
        },
      },
      schemas: {
        UserBasic: {
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
              description: 'Email do usuário (único)',
              format: 'email'
            },
            senha: { 
              type: 'string',
              description: 'Senha do usuário',
              format: 'password'
            }
          },
          required: ['nome', 'email', 'senha']
        },
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
              description: 'Email do usuário (único)',
              format: 'email'
            },
            senha: { 
              type: 'string',
              description: 'Senha do usuário',
              format: 'password'
            },
            adotante: { 
              type: 'object',
              description: 'Dados do adotante',
              properties: {
                id: { type: 'integer' },
                cpf: { type: 'string' }
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
          },
          required: ['nome', 'email', 'senha']
        },
        Adotante: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            cpf: { type: 'string' },
            user: { $ref: '#/components/schemas/User' }
          }
        },
        Ong: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            cnpj: { type: 'string' },
            endereco: { type: 'string' },
            user: { $ref: '#/components/schemas/UserBasic' }
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
                    required: ['nome', 'email', 'senha', 'cpf'],
                    properties: {
                      nome: { type: 'string' },
                      email: { type: 'string' },
                      senha: { type: 'string' },
                      cpf: { type: 'string' }
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
      },
      tags: [
        {
          name: 'Auth',
          description: 'Operações de autenticação'
        },
        {
          name: 'User',
          description: 'Operações de usuário'
        },
        {
          name: 'Adotante',
          description: 'Operações de adotante'
        },
        {
          name: 'Ong',
          description: 'Operações de ONG'
        },
        {
          name: 'Animal',
          description: 'Operações de animal'
        },
        {
          name: 'Adocao',
          description: 'Operações de adoção'
        },
        {
          name: 'Formulario',
          description: 'Operações de formulário'
        }
      ]
    }
  },
  apis: isDev
    ? [
        path.join(__dirname, '../controllers/*.ts'),
        path.join(__dirname, '../controllers/**/*.ts')
      ]
    : [
        path.join(__dirname, '../controllers/*.js'),
        path.join(__dirname, '../controllers/**/*.js')
      ],
};

export const specs = swaggerJsdoc(options);
