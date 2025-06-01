# Estágio de build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY yarn.lock ./

# Instalar dependências
RUN yarn install

# Copiar o resto dos arquivos
COPY . .

# Gerar o cliente Prisma
RUN npx prisma generate

# Compilar TypeScript
RUN yarn build

# Estágio de produção
FROM node:18-alpine

WORKDIR /app

# Copiar arquivos necessários do estágio de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Expor a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/server.js"] 