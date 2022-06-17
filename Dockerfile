# Stage 1 Building and Compiling the Angular Application

# Name the node stage "builder".
FROM node:14.16.0-alpine as builder
# Set working directory.
WORKDIR /app 
# Copy Command will copy the package.json and package.lock.json from our current directory to the root of out working directory inside the docker container, which is this directory (/app).
COPY package.json package.lock.json ./
# install node modules and build assets.
RUN npm install
# Copy all files from current directory to working dir in image (including node_modules and etc.).
COPY . .
# Run build command in production mode.
RUN npm run prod:build


# Stage 2 Hosting part (Serving the Angular Application Using NGINX)

# nginx state for serving content, where we are using nginx alpine image as the base
FROM nginx:latest-alpine
# Set working directory to nginx asset directory (/usr/share/nginx/html) and copy static assets from builder stage.
# WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist/cloudabisweb/ /usr/share/nginx/html
# We need to copy an NGINX configuration file to the Docker image. We've created this file in the same directory.
COPY nginx.conf /etc/nginx/nginx.conf
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]