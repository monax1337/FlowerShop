import React, { useContext } from "react";
import MyButton from "./UI/buttons/MyButton";
import { AuthContext } from "../Contexts";
import { useIntl } from "react-intl";

const FlowerItem = (props) => {
    const intl = useIntl();
    const { isAuth, setIsAuth } = useContext(AuthContext);

    return (
        <div className="flower">
            <div className="flower__content">
                <strong>{props.flower.name} ({props.flower.color})</strong>
                <div>
                    {intl.formatMessage({ id: 'priceText' })}: {props.flower.price}
                </div>
            </div>
            <div className="flower__btns">
                {isAuth
                    ?
                    <>
                        <MyButton onClick={() => props.handleFlowerSelection(props.flower)}>{intl.formatMessage({ id: 'editButton' })}</MyButton>
                        <MyButton style={{ marginLeft: '10px' }} onClick={() => props.removeFlowerFromList(props.flower)}>{intl.formatMessage({ id: 'deleteButton' })}</MyButton>
                    </>
                    :
                    <MyButton onClick={() => props.addToCart(props.flower)}>{intl.formatMessage({ id: 'addToCartButton' })}</MyButton>
                }
            </div>
        </div>
    )
};

export default FlowerItem