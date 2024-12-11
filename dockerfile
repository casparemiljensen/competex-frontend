# Stage 1: Build the Angular app
FROM node:18 AS build
WORKDIR /usr/src/app


COPY package.json ./
RUN npm install -g @angular/cli
RUN npm install
COPY . /usr/src/app

# RUN ng build


RUN npm run build

# CMD ["ng", "serve", "--host", "0.0.0.0"]

# Stage 2: Serve the Angular app with Nginx
FROM nginx:1.25
COPY --from=build /usr/src/app/dist/compete-x ./usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
