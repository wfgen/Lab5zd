# Etap pierwszy
FROM node:alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY app.js .

ARG VERSION
ENV VERSION=$VERSION

# Etap drugi
FROM nginx:latest

COPY --from=builder /app/app.js /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=3s CMD wget --quiet --tries=1 --spider http://localhost || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
