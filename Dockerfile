# Etapa 1: Build
FROM node:22-alpine AS builder

# Evitar que o Puppeteer-core baixe o Chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true

# Instalar Chromium e dependências necessárias
RUN apk add --no-cache \
    chromium \
    harfbuzz \
    ca-certificates \
    nss

# Diretório da aplicação
WORKDIR /app

# Copiar arquivos de dependência
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm ci

# Copiar código-fonte
COPY . .

# Compilar o TypeScript
RUN npm run build

# Etapa 2: Execução
FROM node:22-alpine

ENV PUPPETEER_SKIP_DOWNLOAD=true

# Instalar Chromium e dependências para execução
RUN apk add --no-cache \
    chromium \
    harfbuzz \
    ca-certificates \
    nss

ENV BROWSER_PATH=/usr/bin/chromium-browser

# Diretório da aplicação
WORKDIR /app

# Copiar arquivos necessários do estágio de build
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expõe a porta do servidor
EXPOSE 3000

# Comando para iniciar o servidor Node
CMD ["node", "dist/server.js"]
