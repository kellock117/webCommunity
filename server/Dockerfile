FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

VOLUME [ "./.env:/app.env" ]

CMD ["node", "index.js"]