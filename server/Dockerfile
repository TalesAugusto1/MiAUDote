FROM node:18-alpine

WORKDIR /app

# Instalar OpenSSL
RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3333
RUN npm run build
CMD ["npm", "run", "start"]