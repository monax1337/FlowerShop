import React, { useContext, useEffect, useState } from 'react';
import './Styles/App.css';
import MyNavbar from './Componets/UI/navbars/MyNavbar';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './Componets/AppRouter';
import { AuthContext, CartContext, LocaleContext } from './Contexts';
import { IntlProvider } from 'react-intl';
import messages_ru from './Languages/Russian.json';
import messages_en from './Languages/English.json';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [cart, setCart] = useState([]);
  const { locale, setLocale } = useContext(LocaleContext);
  const [currentLocale, setCurrentLocale] = useState(locale || 'en');

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const toggleLocale = () => {
    const newLocale = currentLocale === 'ru' ? 'en' : 'ru';
    setCurrentLocale(newLocale);
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setCurrentLocale(locale || 'en');
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale: currentLocale, setLocale }}>
      <IntlProvider
        locale={currentLocale}
        messages={currentLocale === 'ru' ? messages_ru : messages_en}
      >
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
          <CartContext.Provider value={{ cart, setCart }}>
            <BrowserRouter>
              <MyNavbar toggleLocale={toggleLocale} />
              <AppRouter locale={currentLocale} />
            </BrowserRouter>
          </CartContext.Provider>
        </AuthContext.Provider>
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

export default App;
