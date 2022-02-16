FROM node:16.14.0-alpine3.15 as node
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm","run","start"]