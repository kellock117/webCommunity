FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 6974

VOLUME [ "./.env:/app.env" ]

CMD ["node", "index.js"]