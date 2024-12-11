# Stage 1: Build the Angular app
FROM node:18 AS build
WORKDIR /usr/src/app

# Copy package files
COPY package.json package-lock.json ./

# Clean workspace to avoid stale files (if rebuilding)
RUN rm -rf node_modules package-lock.json && echo "Workspace cleaned."

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install

# Copy application files
COPY . /usr/src/app

# Build the Angular app
RUN npm run build -- --configuration production

# Stage 2: Serve the Angular app with Nginx
FROM nginx:1.25
COPY --from=build /usr/src/app/dist/compete-x /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
