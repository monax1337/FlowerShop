import React, { useContext, useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import MyLoader from "../Componets/UI/loaders/MyLoader";
import CartList from "../Componets/CartList";
import { LocaleContext } from "../Contexts";
import { useIntl } from "react-intl";
import FlowerService from "../API/FlowerService";
import {
  englishNameDictionary,
  englishColorDictionary,
  russianNameDictionary,
  russianColorDictionary,
} from "../Dictionaries/MyDictionary";

const Cart = () => {
  const intl = useIntl();
  const [fetchFlowers, isFlowersLoading, flowerError] = useFetching(async () => {
  })
  const [cartFlowers, setCartFlowers] = useState([]);
  const { locale, setLocale } = useContext(LocaleContext);

  const selectedLanguage = locale === 'ru' ? 'russian' : 'english';

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

  useEffect(() => {
    const getFlowers = async () => {
      const fetchedFlowers = await FlowerService.getAllCartFlowers(selectedLanguage);
      setCartFlowers(fetchedFlowers);
    };
    getFlowers();
    fetchFlowers();
  }, [setCartFlowers])

  useEffect(() => {
    const getFlowers = async () => {
      const fetchedFlowers = await FlowerService.getAllCartFlowers(selectedLanguage);
      setCartFlowers(fetchedFlowers);
    };
    getFlowers();
  }, [fetchFlowers])

  const removeFromCart = async (flower) => {
    try {
      const flowersRu = await FlowerService.getAllCartFlowers('russian');
      const flowersEn = await FlowerService.getAllCartFlowers('english');

      const existingFlowerInCartRuIndex = flowersRu.findIndex((item) =>
        (selectedLanguage === 'russian' ? item.name === flower.name : getRussianName(flower.name) === item.name) &&
        (selectedLanguage === 'russian' ? item.color === flower.color : getRussianColor(flower.color) === item.color)
      );

      const existingFlowerInCartEnIndex = flowersEn.findIndex((item) =>
        (selectedLanguage === 'english' ? item.name === flower.name : getEnglishName(flower.name) === item.name) &&
        (selectedLanguage === 'english' ? item.color === flower.color : getEnglishColor(flower.color) === item.color)
      );

      if (flowersRu[existingFlowerInCartRuIndex].quantity !== 1) {
        flowersRu[existingFlowerInCartRuIndex].quantity -= 1;
        await FlowerService.updateCartFlowerQuantity(existingFlowerInCartRuIndex, flowersRu[existingFlowerInCartRuIndex].quantity, 'russian');
      } else {
        await FlowerService.removeFlowersFromCart(flowersRu[existingFlowerInCartRuIndex].id, 'russian');
      }

      if (flowersEn[existingFlowerInCartEnIndex].quantity !== 1) {
        flowersEn[existingFlowerInCartEnIndex].quantity -= 1;
        await FlowerService.updateCartFlowerQuantity(existingFlowerInCartEnIndex, flowersEn[existingFlowerInCartEnIndex].quantity, 'english');
      } else {
        await FlowerService.removeFlowersFromCart(flowersEn[existingFlowerInCartEnIndex].id, 'english');
      }
    } catch (error) {
      console.error('Ошибка при добавлении цветка в корзину:', error);
    }
  };

  return (
    <div className="App">
      {flowerError &&
        <h2>{intl.formatMessage({ id: 'errorText' })}{flowerError}</h2>
      }
      {isFlowersLoading &&
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><MyLoader /></div>
      }
      <CartList cart={cartFlowers} removeFromCart={removeFromCart} title={intl.formatMessage({ id: 'cartTitle' })} />
    </div>
  )
};

export default Cart;
