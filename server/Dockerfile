FROM node:14

WORKDIR /kpoLabs/server

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "server.js"]