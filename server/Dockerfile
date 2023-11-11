# Используем базовый образ Node
FROM node:14

# Устанавливаем рабочую директорию в контейнере
WORKDIR /kpoLabs/server

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем файлы серверной части
COPY . .

# Команда для запуска сервера
CMD ["node", "server.js"]
