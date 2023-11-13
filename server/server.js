const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

let initialLanguage = 'russian';

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

const readFlowersFromFile = (language) => {
  try {
    const selectedLanguage = language || initialLanguage;
    const data = fs.readFileSync(path.join(__dirname, `FlowersData_${selectedLanguage}.json`));
    return JSON.parse(data);
  } catch (error) {
    console.error('Ошибка при чтении файла: ', error);
    return [];
  }
};

const writeFlowersToFile = (flowers, language) => {
  try {
    fs.writeFileSync(path.join(__dirname, `FlowersData_${language}.json`), JSON.stringify(flowers, null, 2));
    console.log('Изменения сохранены в файле.');
  } catch (error) {
    console.error('Ошибка при записи в файл: ', error);
  }
};

app.post('/flowers', (req, res) => {
  
  const { newFlower, language } = req.body;
  let flowers = readFlowersFromFile(language);
  flowers.push(newFlower);
  writeFlowersToFile(flowers, language);
  res.send('Flower added successfully.');
});

app.put('/flowers', (req, res) => {
  const { oldFlower, newFlower, language } = req.body;
  const flowers = readFlowersFromFile(language);

  const updatedFlowers = flowers.map(flower => {
    if (flower.id === oldFlower.id) {
      return newFlower;
    }
    return flower;
  });

  writeFlowersToFile(updatedFlowers, language);
  res.send('Flower updated successfully.');
});

app.delete('/flowers', (req, res) => {
  const { flowerId, language } = req.body;
  const flowers = readFlowersFromFile(language);

  const updatedFlowers = flowers.filter(flower => flower.id !== flowerId);

  writeFlowersToFile(updatedFlowers, language);
  res.send('Flower deleted successfully.');
});

app.get('/flowers', (req, res) => {
  const language = req.query.language;
  const flowers = readFlowersFromFile(language);
  res.send(flowers);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
