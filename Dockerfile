FROM node:16 as build-stage
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine as prod-stage
WORKDIR /usr/src/app
COPY proxy-server/package.json .
COPY proxy-server/package-lock.json .
RUN npm install
COPY proxy-server .
COPY --from=build-stage /app/build /usr/src/app/build
CMD ["npm", "start"]