FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 19000

EXPOSE 19001

EXPOSE 19002

CMD ["npx","expo", "start","--tunnel"]
