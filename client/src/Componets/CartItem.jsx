import React from "react";
import MyButton from "./UI/buttons/MyButton";
import {useIntl} from "react-intl";

const CartItem = (props) => {
    const intl = useIntl();

    return (<div>
        <div className="flower" style={{justifyContent: "space-between"}}>
            <div className="flower__content">
                <strong>{props.flower.name} ({props.flower.color})</strong>
                <div>
                    {intl.formatMessage({id: 'priceText'})}: {props.flower.price} | {intl.formatMessage({id: 'quantityText'})}: {props.flower.quantity}
                </div>
            </div>
            <div className="flower__btns">
                <MyButton
                    onClick={() => props.removeFromCart(props.flower)}>{intl.formatMessage({id: 'removeFromCart'})}</MyButton>
            </div>
        </div>
    </div>)
};

export default CartItem