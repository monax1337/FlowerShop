# Используем базовый образ с Node.js
FROM node:14-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /kpoLabs/client

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы в контейнер
COPY . .

# Устанавливаем react-scripts глобально (потребуется для выполнения команды build)
RUN npm install -g react-scripts

# Собираем приложение
RUN npm run build

# Указываем, на каком порту будет работать приложение
EXPOSE 3001

# Команда для запуска приложения
CMD ["npm", "start"]
