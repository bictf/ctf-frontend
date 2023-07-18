FROM node:18.10-alpine AS build
# Create a Virtual directory inside the docker image
WORKDIR /dist/src/app

# Copy files from local machine to virtual directory in docker image
COPY . .
RUN npm run api:compile
RUN npm install
RUN npm run build

### STAGE 2:RUN ###
# Defining nginx image to be used
FROM nginx:latest AS ngi

# Copying compiled code and nginx config to different folder
COPY /dist/new-biss-ctf /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/nginx.conf

# Exposing a port, here it means that inside the container
# the app will be using Port 80 while running
EXPOSE 80
