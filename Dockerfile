FROM node:16-alpine AS build
WORKDIR /app

ARG API
ENV REACT_APP_API=$API

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . ./
RUN yarn build

FROM nginx:mainline
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
