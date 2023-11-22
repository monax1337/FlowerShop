import React, { useContext, useEffect, useState } from 'react';
import MyForm from './UI/forms/MyForm';
import { useIntl } from "react-intl";
import { LocaleContext } from '../Contexts';
import {
  englishNameDictionary,
  englishColorDictionary,
  russianNameDictionary,
  russianColorDictionary,
} from "../Dictionaries/MyDictionary";

const FlowerFormChange = ({ flower, change }) => {
  const intl = useIntl();
  const { locale, setLocale } = useContext(LocaleContext);

  const [updatedFlower, setUpdatedFlower] = useState({
    id: flower ? flower.id : '',
    name: flower ? flower.name : '',
    color: flower ? flower.color : '',
    price: ''
  });

  useEffect(() => {
    setUpdatedFlower({ name: '', price: '', color: '' });
  }, [locale])

  const getEnglishName = (name) => {
    return englishNameDictionary[name];
  };

  const getEnglishColor = (color) => {
    return englishColorDictionary[color];
  };

  const getRussianName = (name) => {
    return russianNameDictionary[name];
  };

  const getRussianColor = (color) => {
    return russianColorDictionary[color];
  };

  const handleNameChange = (value) => {
    setUpdatedFlower({ ...updatedFlower, name: value });
  };

  const handlePriceChange = (value) => {
    setUpdatedFlower({ ...updatedFlower, price: value });
  };

  const handleColorChange = (value) => {
    setUpdatedFlower({ ...updatedFlower, color: value });
  };

  const updateFlower = async (e) => {
    e.preventDefault();
    if (!flower) return;
    let changedFlowerRu, changedFlowerEn;

    if (locale === 'ru') {
      changedFlowerRu = {
        id: flower.id,
        name: updatedFlower.name,
        price: updatedFlower.price,
        color: updatedFlower.color
      };
      changedFlowerEn = {
        id: flower.id,
        name: getEnglishName(updatedFlower.name),
        price: updatedFlower.price,
        color: getEnglishColor(updatedFlower.color)
      };
    } else {
      changedFlowerEn = {
        id: flower.id,
        name: updatedFlower.name,
        price: updatedFlower.price,
        color: updatedFlower.color
      };
      changedFlowerRu = {
        id: flower.id,
        name: getRussianName(updatedFlower.name),
        price: updatedFlower.price,
        color: getRussianColor(updatedFlower.color)
      };
    }
    change(changedFlowerRu, changedFlowerEn);
  };

  return (
    <MyForm
      colorChange={handleColorChange}
      priceChange={handlePriceChange}
      nameChange={handleNameChange}
      func={updateFlower}
      flower={updatedFlower}
      buttonText={intl.formatMessage({ id: 'updateFlowerButton' })}
    />
  );
};

export default FlowerFormChange;
