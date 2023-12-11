import React, {useContext, useEffect, useState} from "react";
import CartList from "../Componets/CartList";
import {LocaleContext} from "../Contexts";
import {useIntl} from "react-intl";
import FlowerService from "../API/FlowerService";
import {
    englishNameDictionary, englishColorDictionary, russianNameDictionary, russianColorDictionary,
} from "../Dictionaries/MyDictionary";
import MyCheckBox from "../Componets/UI/checkboxes/MyCheckBox";
import MyButton from "../Componets/UI/buttons/MyButton";


const Cart = () => {
    const intl = useIntl();
    const [cartFlowers, setCartFlowers] = useState([]);
    const {locale, setLocale} = useContext(LocaleContext);
    const [totalPrice, setTotalPrice] = useState(0);

    const selectedLanguage = locale === 'ru' ? 'russian' : 'english';

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
        const calculateTotalPrice = () => {
            let totalPrice = 0;
            cartFlowers.forEach(flower => {
                totalPrice += flower.price * flower.quantity;
            });
            setTotalPrice(totalPrice);
        };
        calculateTotalPrice();
    }, [cartFlowers]);

    const getFlowers = async () => {
        const fetchedFlowers = await FlowerService.getAllCartFlowers(selectedLanguage);
        setCartFlowers(fetchedFlowers);
    };

    useEffect(() => {
        getFlowers();
    }, [setCartFlowers])

    const removeFromCart = async (flower) => {
        try {
            const flowersRu = await FlowerService.getAllCartFlowers('russian');
            const flowersEn = await FlowerService.getAllCartFlowers('english');

            const existingFlowerInCartRuIndex = flowersRu.findIndex((item) => (selectedLanguage === 'russian' ? item.name === flower.name : getRussianName(flower.name) === item.name) && (selectedLanguage === 'russian' ? item.color === flower.color : getRussianColor(flower.color) === item.color));

            const existingFlowerInCartEnIndex = flowersEn.findIndex((item) => (selectedLanguage === 'english' ? item.name === flower.name : getEnglishName(flower.name) === item.name) && (selectedLanguage === 'english' ? item.color === flower.color : getEnglishColor(flower.color) === item.color));

            if (flowersRu[existingFlowerInCartRuIndex].quantity !== 1) {
                flowersRu[existingFlowerInCartRuIndex].quantity -= 1;
                await FlowerService.updateCartFlowerQuantity(existingFlowerInCartRuIndex, flowersRu[existingFlowerInCartRuIndex].quantity, 'russian');
            } else {
                await FlowerService.removeFlowersFromCart(flowersRu[existingFlowerInCartRuIndex].id, 'russian');
            }

            if (flowersEn[existingFlowerInCartEnIndex].quantity !== 1) {
                flowersEn[existingFlowerInCartEnIndex].quantity -= 1;
                await FlowerService.updateCartFlowerQuantity(existingFlowerInCartEnIndex, flowersEn[existingFlowerInCartEnIndex].quantity, 'english');
            } else {
                await FlowerService.removeFlowersFromCart(flowersEn[existingFlowerInCartEnIndex].id, 'english');
            }
            const updatedCart = cartFlowers.map(item => {
                if (item.id === flower.id) {
                    return {...item, quantity: item.quantity - 1};
                }
                return item;
            }).filter(item => item.quantity > 0);
            setCartFlowers(updatedCart);
        } catch (error) {
            console.error('Ошибка при добавлении цветка в корзину:', error);
        }
    };

    return (<div className="cart">
        <div className="cart__menu">
            <div className="cart__sidebar">
                <h3 className="cart__h3">{intl.formatMessage({id: 'AdditionalDecoration'})}</h3>
                <MyCheckBox text={intl.formatMessage({id: 'SatinRibbon'})}/>
                <MyCheckBox text={intl.formatMessage({id: 'CellophanePackaging'})}/>
                <MyCheckBox text={intl.formatMessage({id: 'DecorativePackaging'})}/>
            </div>
            <div>
                <h2 className="cart__h2">{intl.formatMessage({id: 'TotalPrice'})}: {totalPrice}</h2>
            </div>
            <div>
                <MyButton>{intl.formatMessage({id: 'PlaceAnOrder'})}</MyButton>
            </div>
        </div>

        <div className="cart__content">
            <div className="App">
                <CartList cart={cartFlowers} removeFromCart={removeFromCart}
                          title={intl.formatMessage({id: 'cartTitle'})}/>
            </div>
        </div>
    </div>)
};

export default Cart;
