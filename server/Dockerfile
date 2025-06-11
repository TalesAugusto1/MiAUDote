FROM node:18-alpine

WORKDIR /app

# Instalar OpenSSL
RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

# Definir ambiente de produção
ENV NODE_ENV=production
ENV JWT_SECRET=sua_chave_secreta_muito_segura_aqui

EXPOSE 3333
RUN npm run build
CMD ["npm", "run", "start"]