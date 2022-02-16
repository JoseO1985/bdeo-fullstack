FROM node:latest as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=builder /app/dist/web/ /usr/share/nginx/html
