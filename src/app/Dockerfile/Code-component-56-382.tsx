# ============================================================================
# TRADIE Multi-Stage Docker Build
# MySQL + Node.js Backend + React Frontend
# ============================================================================

# ----------------------------------------------------------------------------
# Stage 1: Build React Frontend
# ----------------------------------------------------------------------------
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy frontend package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy frontend source
COPY components/ ./components/
COPY styles/ ./styles/
COPY design-system/ ./design-system/
COPY public/ ./public/
COPY tsconfig.json ./
COPY next.config.js ./
COPY App.tsx ./

# Build React app
RUN npm run build

# ----------------------------------------------------------------------------
# Stage 2: Build Node.js Backend
# ----------------------------------------------------------------------------
FROM node:18-alpine AS backend-builder

WORKDIR /app/backend

# Copy backend package files
COPY api/package.json api/package-lock.json ./

# Install dependencies (production only)
RUN npm ci --only=production

# Copy backend source
COPY api/ ./

# ----------------------------------------------------------------------------
# Stage 3: Production Runtime
# ----------------------------------------------------------------------------
FROM node:18-alpine AS production

# Install MySQL client (for health checks and migrations)
RUN apk add --no-cache mysql-client

# Create app directory
WORKDIR /app

# Copy backend from builder
COPY --from=backend-builder /app/backend ./

# Copy frontend build output to serve as static files
COPY --from=frontend-builder /app/frontend/build ./public

# Copy database schemas for migrations
COPY database/ ./database/

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Create directories with proper permissions
RUN mkdir -p logs uploads && \
    chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose backend port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Environment variables (override with docker-compose or runtime)
ENV NODE_ENV=production \
    PORT=3001

# Start backend server
CMD ["node", "server.js"]
