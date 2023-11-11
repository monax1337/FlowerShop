import React from "react";
import CartItem from './CartItem';
import { TransitionGroup } from "react-transition-group";
import { CSSTransition } from "react-transition-group";
import { useIntl } from "react-intl";

const CartList = ({ cart, title, removeFromCart }) => {
    const intl = useIntl();

    if (!cart.length) {
        return (
            <h1 style={{ textAlign: "center" }}>
                {intl.formatMessage({ id: 'emptyCartText' })}
            </h1>
        )
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>
                {title}
            </h1>
            <TransitionGroup>
                {cart.map((cartFlower) =>
                    <CSSTransition
                        key={cartFlower.id}
                        timeout={500}
                        classNames="flower"
                    >
                        <CartItem removeFromCart={removeFromCart} flower={cartFlower} />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    )
};

export default CartList