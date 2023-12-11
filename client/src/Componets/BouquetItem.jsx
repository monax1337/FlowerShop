import React, {useContext} from 'react';
import {useIntl} from "react-intl";
import {AuthContext, LocaleContext} from "../Contexts";
import {englishColorDictionary, englishNameDictionary} from "../Dictionaries/MyDictionary";
import MyButton from "./UI/buttons/MyButton";

const BouquetItem = (props) => {
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
    const path =
        selectedLanguage === 'russian'
            ? `/images/${getEnglishName(props.bouquet.name)}.jpg`
            : `/images/${props.bouquet.name}.jpg`;
    return (
        <div className="flower" style={{justifyContent: "space-around"}}>
            <div className="flower__image">
                <img src={path}/>
            </div>
            <div className="flower__content">
                <div className="flower__info">
                    <strong>{props.bouquet.name} ({props.bouquet.quantity})</strong>
                    <div>
                        {intl.formatMessage({id: 'priceText'})}: {props.bouquet.price}
                    </div>
                </div>

                <div className="flower__btns">
                    {isAuth
                        ?
                        <>
                            <MyButton
                                onClick={() => props.handleBouquetSelection(props.bouquet)}>{intl.formatMessage({id: 'editButton'})}</MyButton>
                            <MyButton style={{marginLeft: '10px'}}
                                      onClick={() => props.removeBouquetFromList(props.bouquet)}>{intl.formatMessage({id: 'deleteButton'})}</MyButton>
                        </>
                        :
                        <MyButton
                            onClick={() => props.addToCart(props.bouquet)}>{intl.formatMessage({id: 'addToCartButton'})}</MyButton>
                    }
                </div>
            </div>
        </div>
    );
};

export default BouquetItem;