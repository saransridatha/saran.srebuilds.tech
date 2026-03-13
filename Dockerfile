# Build Stage
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies based on preferred package manager
COPY package.json package-lock.json* bun.lockb* ./

RUN npm ci || bun install

# Copy source
COPY . .

# Build the project
RUN npm run build

# Production Stage - NGINX
FROM nginx:alpine

# Copy built assets from build stage to nginx serving directory
COPY --from=build /app/dist /usr/share/nginx/html

# Create custom nginx config to handle SPA routing (React Router)
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
