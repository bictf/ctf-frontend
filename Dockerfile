FROM node:21 AS build
# Copy files from local machine to virtual directory in docker image
COPY . /code
WORKDIR /code
RUN npm install
RUN npm run build

### STAGE 2:RUN ###
# Defining nginx image to be used
FROM nginx:latest AS ngi

# Copying compiled code and nginx config to different folder
COPY --from=build /code/dist/new-biss-ctf /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/nginx.conf

# Exposing a port, here it means that inside the container
# the app will be using Port 80 while running
EXPOSE 80
