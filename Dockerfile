# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:1.27-alpine

# Copia configurazione nginx custom
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia build output
COPY --from=builder /app/dist /usr/share/nginx/html

# Script di entrypoint per la sostituzione delle env vars a runtime
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

