# ==========================================
# Phase 1: Build the Vite production assets
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies (utilize docker layer caching)
COPY package*.json ./
RUN npm ci

# Copy full source and compile the project
COPY . .
RUN npm run build

# ==========================================
# Phase 2: Create a secure, lightweight runtime
# ==========================================
FROM node:20-alpine

WORKDIR /app

# Copy production build output and server script from build phase
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./server.js

# Configure Cloud Run environment ports
ENV PORT=8080
EXPOSE 8080

# Execute server using node
CMD ["node", "server.js"]
