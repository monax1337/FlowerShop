FROM node:14-alpine

WORKDIR /kpoLabs/client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g react-scripts

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
