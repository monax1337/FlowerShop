import React, { useContext } from "react";
import MyButton from "../buttons/MyButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts";
import { useIntl } from "react-intl";

const MyNavbar = ({ toggleLocale }) => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const location = useLocation();
  const intl = useIntl();
  const navigate = useNavigate();

  const messages = React.useMemo(() => {
    return {
      logout: intl.formatMessage({ id: 'logout' }),
      loginAsAdmin: intl.formatMessage({ id: 'loginAsAdmin' }),
      adminPanel: intl.formatMessage({ id: 'adminPanel' }),
      home: intl.formatMessage({ id: 'home' }),
      cart: intl.formatMessage({ id: 'cart' }),
      switchLanguage: intl.formatMessage({ id: 'switchLanguage' })
    };
  }, [intl]);

  const handleLogout = async () => {
    localStorage.removeItem('auth');
    await setIsAuth(false);
    navigate('/flowers');
  };

  const showHomeButton = location.pathname !== '/flowers';
  const showPanelButton = location.pathname !== '/admin';
  const showCartButton = location.pathname !== '/cart';
  const showLoginButton = location.pathname !== '/login';

  return (
    <div className="navbar">
      {showLoginButton && (
        <div className="navbar__admin">
          {isAuth
            ?
            <Link to='/flowers' onClick={handleLogout} className="linkStyle">
              {messages.logout}
            </Link>
            :
            <Link to='/login' className="linkStyle">
              {messages.loginAsAdmin}
            </Link>
          }
        </div>
      )}
      {isAuth
        ?
        (showPanelButton && (
          <div className="navbar__adminPanel">
            <Link to='/admin' className="linkStyle">
              {messages.adminPanel}
            </Link>
          </div>))
        :
        (showHomeButton && (
          <div className="navbar__home">
            <Link to='/flowers' className="linkStyle">
              {messages.home}
            </Link>
          </div>))
      }
      {!isAuth && showCartButton && (
        <div className="navbar__cart">
          <Link to='/cart' className="linkStyle">
            {messages.cart}
          </Link>
        </div>)
      }
      <div className="navbar__language">
        <MyButton style={{ border: "none" }} onClick={toggleLocale}>
          {messages.switchLanguage}
        </MyButton>
      </div>
    </div>
  )
};

export default MyNavbar;
