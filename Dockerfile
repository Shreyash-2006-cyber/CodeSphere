# ==========================================
# Stage 1: Build Frontend Assets
# ==========================================
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
# Accept build-time API base URL if needed (default: /api for unified deployment)
ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

# ==========================================
# Stage 2: Production Server Runner
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5001

# Copy server package definitions and install production dependencies
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm install --omit=dev

# Copy server source code
COPY server/ ./

# Copy compiled frontend dist from Stage 1 into frontend/dist
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# Use non-root node user for security
USER node

EXPOSE 5001

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:5001/api/health || exit 1

CMD ["node", "server.js"]
