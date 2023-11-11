import React, { useContext } from "react";
import MyButton from "../buttons/MyButton";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../Contexts";
import { useIntl } from "react-intl";

const MyNavbar = ({ toggleLocale }) => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const location = useLocation();
  const intl = useIntl();

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  }

  const messages = {
    logout: intl.formatMessage({ id: 'logout' }),
    loginAsAdmin: intl.formatMessage({ id: 'loginAsAdmin' }),
    adminPanel: intl.formatMessage({ id: 'adminPanel' }),
    home: intl.formatMessage({ id: 'home' }),
    cart: intl.formatMessage({ id: 'cart' }),
    switchLanguage: intl.formatMessage({ id: 'switchLanguage' }),
  };

  const showHomeButton = location.pathname !== '/flowers';
  const showPanelButton = location.pathname !== '/admin';
  const showCartButton = location.pathname !== '/cart';
  const showLoginButton = location.pathname !== '/login';

  return (
    <div className="navbar">
      {showLoginButton && (
        <div className="navbar__admin">
          <MyButton>
            {isAuth
              ?
              <Link to='/flowers' onClick={logout} className="linkStyle">
                {messages.logout}
              </Link>
              :
              <Link to='/login' className="linkStyle">
                {messages.loginAsAdmin}
              </Link>
            }
          </MyButton>
        </div>
      )}
      {isAuth
        ?
        (showPanelButton && (
          <div className="navbar__adminPanel">
            <MyButton>
              <Link to='/admin' className="linkStyle">
                {messages.adminPanel}
              </Link>
            </MyButton>
          </div>))
        :
        (showHomeButton && (
          <div className="navbar__home">
            <MyButton>
              <Link to='/flowers' className="linkStyle">
                {messages.home}
              </Link>
            </MyButton>
          </div>))
      }
      {!isAuth && showCartButton && (
        <div className="navbar__cart">
          <MyButton>
            <Link to='/cart' className="linkStyle">
              {messages.cart}
            </Link>
          </MyButton>
        </div>)
      }
      <div className="navbar__language">
        <MyButton onClick={toggleLocale}>
          {messages.switchLanguage}
        </MyButton>
      </div>
    </div>
  )
};

export default MyNavbar