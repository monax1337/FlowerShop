import React, {useContext, useState} from "react";
import MyButton from "./UI/buttons/MyButton";
import {AuthContext, LocaleContext} from "../Contexts";
import {useIntl} from "react-intl";
import {
    englishNameDictionary, englishColorDictionary
} from "../Dictionaries/MyDictionary";

const FlowerItem = (props) => {
    const intl = useIntl();
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const {locale, setLocale} = useContext(LocaleContext);

    const getEnglishName = (name) => {
        return englishNameDictionary[name];
    };

    const getEnglishColor = (color) => {
        return englishColorDictionary[color];
    };

    const selectedLanguage = locale === 'ru' ? 'russian' : 'english';
    const path = selectedLanguage === 'russian' ? `/images/${getEnglishColor(props.flower.color)}${getEnglishName(props.flower.name)}.jpg` : `/images/${props.flower.color}${props.flower.name}.jpg`;

    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event) => {
        const inputQuantity = parseInt(event.target.value, 10);
        if (!isNaN(inputQuantity) && inputQuantity >= 1) {
            setQuantity(inputQuantity);
        } else {
            setQuantity("");
        }
    };

    return (<div className="flower" style={{justifyContent: "space-around"}}>
            <div className="flower__image">
                <img src={path}/>
            </div>
            <div className="flower__content">
                <div className="flower__info">
                    <strong>{props.flower.name} ({props.flower.color})</strong>
                    <div>
                        {intl.formatMessage({id: 'priceText'})}: {props.flower.price}
                    </div>
                </div>

                <div className="flower__quantity">
                    <MyButton style={{fontSize: "16px"}}
                              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}> - </MyButton>
                    <input
                        type="text"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="flower__input"
                    />
                    <MyButton style={{fontSize: "16px"}} onClick={() => setQuantity(quantity + 1)}> + </MyButton>
                </div>

                <div className="flower__btns">
                    {isAuth ? <>
                        <MyButton
                            onClick={() => props.handleFlowerSelection(props.flower)}>{intl.formatMessage({id: 'editButton'})}</MyButton>
                        <MyButton style={{marginLeft: '10px'}}
                                  onClick={() => props.removeFlowerFromList(props.flower)}>{intl.formatMessage({id: 'deleteButton'})}</MyButton>
                    </> : <MyButton
                        onClick={() => {
                            (quantity !== "") ? props.addToCart(props.flower, quantity) : alert(intl.formatMessage({id: 'IncorrectQuantityEntry'}))
                        }}>{intl.formatMessage({id: 'addToCartButton'})}</MyButton>}
                </div>
            </div>
        </div>)
};

export default FlowerItem