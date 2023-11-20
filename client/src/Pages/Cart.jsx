import React, { useContext, useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import MyLoader from "../Componets/UI/loaders/MyLoader";
import CartList from "../Componets/CartList";
import { CartContext, LocaleContext } from "../Contexts";
import { useIntl } from "react-intl";
import FlowerService from "../API/FlowerService";

const Cart = () => {
  const intl = useIntl();
  const [fetchFlowers, isFlowersLoading, flowerError] = useFetching(async () => {
  })
  const { cart, setCart } = useContext(CartContext);
  const [cartFlowers, setCartFlowers] = useState([]);
  const { locale, setLocale } = useContext(LocaleContext);

  const selectedLanguage = locale === 'ru' ? 'russian' : 'english';

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

  const removeFromCart = (flower) => {
    const indexToRemove = cart.findIndex((item) => item.id === flower.id);
    if (indexToRemove !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[indexToRemove].quantity > 1) {
        updatedCart[indexToRemove].quantity -= 1;
      } else {
        updatedCart.splice(indexToRemove, 1);
      }
      setCart(updatedCart);
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
