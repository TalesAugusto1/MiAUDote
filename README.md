# MiAuDote - Aplicativo de Adoção de Animais

## Sobre o Projeto
MiAuDote é um aplicativo mobile desenvolvido com React Native e Expo, focado em facilitar a adoção de animais. O projeto implementa padrões de design SOLID e Strategy para garantir uma arquitetura robusta e manutenível.

## Estrutura do Projeto
```
MiAuDote/
├── app/                  # Rotas e páginas da aplicação
├── assets/              # Recursos estáticos (imagens, fontes)
├── components/          # Componentes reutilizáveis
├── constants/           # Constantes e configurações
├── context/            # Contextos do React
├── hooks/              # Custom hooks
├── server/             # Backend da aplicação
├── services/           # Serviços e lógica de negócio
│   ├── api/           # Cliente HTTP e configurações
│   ├── animals/       # Serviços relacionados a animais
│   └── auth/          # Serviços de autenticação
└── types/              # Definições de tipos TypeScript
```

## Implementação dos Padrões SOLID

### 1. Single Responsibility Principle (SRP)
- **AuthStorage**: Classe responsável exclusivamente pelo gerenciamento de dados de autenticação
- **ApiClient**: Classe dedicada apenas ao gerenciamento de requisições HTTP
- **AnimalService**: Responsável apenas pela lógica de negócios relacionada aos animais

### 2. Open/Closed Principle (OCP)
- **Interfaces de Serviço**: `IAuthService` e `IAnimalService` permitem extensões sem modificar o código existente
- **Sistema de Cache**: Implementação flexível que pode ser estendida para diferentes estratégias de cache

### 3. Liskov Substitution Principle (LSP)
- **Serviços de Autenticação**: `AuthService` implementa completamente a interface `IAuthService`
- **Serviços de Animais**: `AnimalService` implementa `IAnimalService` de forma substituível

### 4. Interface Segregation Principle (ISP)
- **Interfaces Específicas**: `IAuthService` e `IAnimalService` são específicas para seus domínios
- **Tipos de Dados**: Interfaces como `User` e `Animal` são bem definidas e específicas

### 5. Dependency Inversion Principle (DIP)
- **Injeção de Dependências**: Serviços dependem de abstrações (interfaces) ao invés de implementações concretas
- **Acoplamento Baixo**: Uso de interfaces para reduzir o acoplamento entre componentes

## Padrão Strategy Implementado

### Estratégias de Autenticação
- Interface `IAuthService` permite diferentes estratégias de autenticação
- Classe `AuthService` implementa uma estratégia específica, mas pode ser substituída

### Estratégias de Cache
- Sistema de cache no `AnimalService` que pode ser estendido
- Implementação flexível para diferentes necessidades de armazenamento

## Tecnologias Utilizadas
- React Native
- Expo
- TypeScript
- Node.js (Backend)
- MySQL (Banco de Dados)

## Como Executar

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npx expo start
```

3. Para o backend:
```bash
cd server
npm install
npm run dev
```

## Melhorias Futuras

1. Implementar container de DI (InversifyJS)
2. Adicionar estratégias de persistência (API REST, GraphQL)
3. Implementar sistema de validação baseado em estratégias
4. Desenvolver sistema de notificações flexível
5. Adicionar testes unitários

## Contribuição
Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# Implementação dos Padrões SOLID e Strategy no MiAuDote

## Padrões SOLID Implementados

### 1. Single Responsibility Principle (SRP)
- **AuthStorage**: Classe responsável exclusivamente pelo gerenciamento de dados de autenticação
- **ApiClient**: Classe dedicada apenas ao gerenciamento de requisições HTTP
- **AnimalService**: Responsável apenas pela lógica de negócios relacionada aos animais

### 2. Open/Closed Principle (OCP)
- **Interfaces de Serviço**: `IAuthService` e `IAnimalService` permitem extensões sem modificar o código existente
- **Sistema de Cache**: Implementação flexível que pode ser estendida para diferentes estratégias de cache

### 3. Liskov Substitution Principle (LSP)
- **Serviços de Autenticação**: `AuthService` implementa completamente a interface `IAuthService`
- **Serviços de Animais**: `AnimalService` implementa `IAnimalService` de forma substituível

### 4. Interface Segregation Principle (ISP)
- **Interfaces Específicas**: `IAuthService` e `IAnimalService` são específicas para seus domínios
- **Tipos de Dados**: Interfaces como `User` e `Animal` são bem definidas e específicas

### 5. Dependency Inversion Principle (DIP)
- **Injeção de Dependências**: Serviços dependem de abstrações (interfaces) ao invés de implementações concretas
- **Acoplamento Baixo**: Uso de interfaces para reduzir o acoplamento entre componentes

## Padrão Strategy Implementado

### Estratégias de Autenticação
- Interface `IAuthService` permite diferentes estratégias de autenticação
- Classe `AuthService` implementa uma estratégia específica, mas pode ser substituída

### Estratégias de Cache
- Sistema de cache no `AnimalService` que pode ser estendido
- Implementação flexível para diferentes necessidades de armazenamento

## O que não foi possível implementar e por quê

### 1. Injeção de Dependências Completa
- **Razão**: A implementação atual usa instâncias diretas de serviços (`new AuthService()`, `new AnimalService()`)
- **Solução Proposta**: Implementar um container de DI como InversifyJS ou usar o sistema de DI do React

### 2. Estratégias de Persistência
- **Razão**: O projeto atual usa mock data e localStorage
- **Solução Proposta**: Implementar diferentes estratégias de persistência (API REST, GraphQL, IndexedDB)

### 3. Estratégias de Validação
- **Razão**: Validações estão acopladas diretamente nos componentes
- **Solução Proposta**: Criar uma interface de validação e diferentes estratégias de validação

### 4. Estratégias de Notificação
- **Razão**: Sistema de notificações não está completamente implementado
- **Solução Proposta**: Implementar diferentes estratégias de notificação (push, email, SMS)

## Melhorias Futuras

1. Implementar um container de DI para melhor gerenciamento de dependências
2. Adicionar mais estratégias de persistência
3. Implementar um sistema de validação baseado em estratégias
4. Desenvolver um sistema de notificações flexível
5. Adicionar testes unitários para validar as implementações dos padrões

