# Fase 1: Instalar dependencias
FROM node:18-alpine3.15 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Fase 2: Construir la aplicación con caché de dependencias
FROM node:18-alpine3.15 AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Fase 3: Crear la imagen de producción
FROM node:18-alpine3.15 AS runner
WORKDIR /usr/src/app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod
COPY --from=builder /app/dist ./dist

# Comando para iniciar la app
CMD [ "node", "dist/main" ]
