# ---- Base ----
FROM node:22-alpine AS base
WORKDIR /app

# ---- Dependencies ----
FROM base AS deps
COPY backend/package*.json ./   # <- note the "backend/" prefix
RUN npm ci

# ---- Build ----
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY backend/ .                 # <- copy the whole backend source
RUN npm run build               # produces ./build inside /app

# ---- Production ----
FROM base
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
EXPOSE 8080
CMD ["node", "build/bin/server.js"]