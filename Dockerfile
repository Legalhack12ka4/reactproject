FROM node:16 as build-stage
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build


FROM node:16-alpine as prod-stage
WORKDIR /usr/src/app
Copy --from=build-stage /app/build /usr/src/app
CMD ["npm", "run", "start"]