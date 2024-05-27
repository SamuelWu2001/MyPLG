FROM node:20.12.1

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 19000

EXPOSE 19001

EXPOSE 19002
