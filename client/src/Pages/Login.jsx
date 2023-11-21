import React, { useContext } from "react";
import MyButton from "../Componets/UI/buttons/MyButton";
import MyInput from "../Componets/UI/inputs/MyInput";
import { AuthContext } from "../Contexts";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";

const Login = () => {
    const intl = useIntl();
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const login = e => {
        e.preventDefault();
        localStorage.setItem('auth', 'true');
        navigate('/admin');
        setIsAuth(true);
    }

    return (
        <div>
            <h1>{intl.formatMessage({ id: 'pageTitle' })}</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder={intl.formatMessage({ id: 'loginPlaceholder' })} />
                <MyInput type="password" placeholder={intl.formatMessage({ id: 'passwordPlaceholder' })} />
                <MyButton>
                    {intl.formatMessage({ id: 'loginButton' })}
                </MyButton>
            </form>
        </div>
    )
};

export default Login;
