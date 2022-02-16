FROM node:17-alpine

WORKDIR /app
COPY package*.json ./
RUN npm i --legacy-peer-deps
RUN npm install -g @angular/cli
COPY . /app/

EXPOSE 4200
