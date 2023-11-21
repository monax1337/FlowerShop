import React, { useContext, useEffect, useState } from "react";
import FlowerList from "../Componets/FlowerList";
import { useFetching } from "../hooks/useFetching";
import MyLoader from "../Componets/UI/loaders/MyLoader";
import { LocaleContext } from "../Contexts";
import FlowerFilter from "../Componets/FlowerFilter";
import { useFlowers } from "../hooks/useFlowers";
import FlowerService from "../API/FlowerService";
import { useIntl } from "react-intl";
import {
  englishNameDictionary,
  englishColorDictionary,
  russianNameDictionary,
  russianColorDictionary,
} from "../Dictionaries/MyDictionary";

const Flowers = () => {
  const intl = useIntl();
  const [flowers, setFlowers] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const sortedAndSearchedFlowers = useFlowers(flowers, filter.sort, filter.query);
  const { locale, setLocale } = useContext(LocaleContext);

  const selectedLanguage = locale === 'ru' ? 'russian' : 'english';

  const [fetchFlowers, isFlowersLoading, flowerError] = useFetching(async () => {
  })

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
      const fetchedFlowers = await FlowerService.getAllFlowers(selectedLanguage);
      setFlowers(fetchedFlowers);
    };

    getFlowers();
    fetchFlowers();
  }, []);


  useEffect(() => {
    const getFlowers = async () => {
      const fetchedFlowers = await FlowerService.getAllFlowers(selectedLanguage);
      setFlowers(fetchedFlowers);
    };
    getFlowers();
  }, [fetchFlowers])

  const addToCart = async (flower) => {
    try {
      let cartFlowerRu, cartFlowerEn;

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

      if (existingFlowerInCartRuIndex !== -1) {
        flowersRu[existingFlowerInCartRuIndex].quantity += 1;
        await FlowerService.updateCartFlowerQuantity(existingFlowerInCartRuIndex, flowersRu[existingFlowerInCartRuIndex].quantity, 'russian');
      } else {
        cartFlowerRu = {
          id: flower.id,
          name: selectedLanguage === 'russian' ? flower.name : getRussianName(flower.name),
          price: flower.price,
          color: selectedLanguage === 'russian' ? flower.color : getRussianColor(flower.color),
          quantity: 1
        };
        await FlowerService.addFlowerToCart(cartFlowerRu, 'russian');
      }

      if (existingFlowerInCartEnIndex !== -1) {
        flowersEn[existingFlowerInCartEnIndex].quantity += 1;
        await FlowerService.updateCartFlowerQuantity(existingFlowerInCartEnIndex, flowersEn[existingFlowerInCartEnIndex].quantity, 'english');
      } else {
        cartFlowerEn = {
          id: flower.id,
          name: selectedLanguage === 'english' ? flower.name : getEnglishName(flower.name),
          price: flower.price,
          color: selectedLanguage === 'english' ? flower.color : getEnglishColor(flower.color),
          quantity: 1
        };
        await FlowerService.addFlowerToCart(cartFlowerEn, 'english');
      }
    } catch (error) {
      console.error('Ошибка при добавлении цветка в корзину:', error);
    }
  };

  return (
    <div className="App">
      <FlowerFilter filter={filter} setFilter={setFilter} />
      {flowerError &&
        <h2>{intl.formatMessage({ id: 'errorText' })}{flowerError}</h2>
      }
      {isFlowersLoading &&
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><MyLoader /></div>
      }
      <FlowerList flowers={sortedAndSearchedFlowers} addToCart={addToCart} title={intl.formatMessage({ id: 'listTitle' })} />
    </div>
  )
};

export default Flowers;
