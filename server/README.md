# MiAUDote Backend

Backend da aplicação MiAUDote desenvolvido com Node.js, Express, TypeScript, Prisma e MySQL.

## Requisitos

- Node.js 18+
- MySQL 8+
- npm ou yarn

## Configuração

1. Clone o repositório
2. Instale as dependências:
```bash
cd server
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
DATABASE_URL="mysql://root:password@localhost:3306/miaudote"
JWT_SECRET="sua_chave_secreta_muito_segura"
PORT=3333
```

4. Configure o banco de dados:
```bash
# Crie o banco de dados
mysql -u root -p
CREATE DATABASE miaudote;

# Execute as migrações do Prisma
npx prisma migrate dev
```

## Executando o projeto

Para desenvolvimento:
```bash
npm run dev
```

Para produção:
```bash
npm run build
npm start
```

## Estrutura do Projeto

```
src/
  ├── controllers/     # Controladores da API
  ├── services/       # Lógica de negócios
  ├── repositories/   # Acesso ao banco de dados
  ├── interfaces/     # Interfaces e tipos
  ├── strategies/     # Implementações de estratégias
  └── config/         # Configurações
```

## Endpoints

### Autenticação

- POST /auth/register
  - Registra um novo usuário
  - Body: { name, email, password, profilePicture? }

- POST /auth/login
  - Autentica um usuário
  - Body: { email, password }

## Princípios SOLID

O projeto segue os princípios SOLID:

- **S**ingle Responsibility: Cada classe tem uma única responsabilidade
- **O**pen/Closed: Uso de interfaces e estratégias para extensibilidade
- **L**iskov Substitution: Implementações seguem contratos de interfaces
- **I**nterface Segregation: Interfaces específicas para cada necessidade
- **D**ependency Inversion: Dependências injetadas via construtor 