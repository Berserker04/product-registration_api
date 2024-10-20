# Fase 1: Instalar dependencias
FROM node:20.12.2-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Fase 2: Construir la aplicación con caché de dependencias
FROM node:20.12.2-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Fase 3: Crear la imagen de producción
FROM node:20.12.2-alpine AS runner
WORKDIR /usr/src/app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod
COPY --from=builder /app/dist ./dist

# Comando para iniciar la app
CMD [ "node", "dist/main" ]
