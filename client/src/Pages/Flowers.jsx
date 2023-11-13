import React, { useContext, useEffect, useState } from "react";
import FlowerList from "../Componets/FlowerList";
import { useFetching } from "../hooks/useFetching";
import MyLoader from "../Componets/UI/loaders/MyLoader";
import { CartContext, LocaleContext } from "../Contexts";
import FlowerFilter from "../Componets/FlowerFilter";
import { useFlowers } from "../hooks/useFlowers";
import FlowerService from "../API/FlowerService";
import { useIntl } from "react-intl";

const Flowers = () => {
  const intl = useIntl();
  const [flowers, setFlowers] = useState([]);
  const { cart, setCart } = useContext(CartContext);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const sortedAndSearchedFlowers = useFlowers(flowers, filter.sort, filter.query);
  const { locale, setLocale } = useContext(LocaleContext);

  const selectedLanguage = locale === 'ru' ? 'russian' : 'english';

  const [fetchFlowers, isFlowersLoading, flowerError] = useFetching(async () => {
  })

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

  const addToCart = (flower) => {
    const existingFlower = cart.find((item) => item.id === flower.id);

    if (existingFlower) {
      const updatedCart = cart.map((item) =>
        item.id === flower.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      const updatedCart = [...cart, { ...flower, quantity: 1 }];
      setCart(updatedCart);
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
