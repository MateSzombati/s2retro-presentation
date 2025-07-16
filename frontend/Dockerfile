FROM node:22.17.0-alpine AS build
WORKDIR /app

ARG CONFIGURATION=production

ENV NODE_ENV=production

COPY package.json package-lock.json ./

RUN npm ci --include=dev

COPY . .

RUN npm run build -- --configuration $CONFIGURATION

FROM nginx:1.28-alpine AS runtime

ENV NODE_ENV=production

EXPOSE 80

COPY --from=build /app/dist/s2retro /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]