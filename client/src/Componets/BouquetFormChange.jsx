import React, {useContext, useEffect, useState} from 'react';
import {LocaleContext} from "../Contexts";
import {useIntl} from "react-intl";
import {
    englishNameDictionary,
    russianNameDictionary
} from "../Dictionaries/MyDictionary";
import MyBouquetForm from "./UI/forms/MyBouquetForm";

const BouquetFormChange = ({bouquet, change}) => {
    const intl = useIntl();
    const {locale, setLocale} = useContext(LocaleContext);

    const [updatedBouquet, setUpdatedBouquet] = useState({
        id: bouquet ? bouquet.id : '',
        name: bouquet ? bouquet.name : '',
        quantity: bouquet ? bouquet.quantity : '',
        price: ''
    });

    useEffect(() => {
        setUpdatedBouquet({name: '', price: '', quantity: ''});
    }, [locale])

    const getEnglishName = (name) => {
        return englishNameDictionary[name];
    };

    const getRussianName = (name) => {
        return russianNameDictionary[name];
    };

    const handleNameChange = (value) => {
        setUpdatedBouquet({...updatedBouquet, name: value});
    };

    const handlePriceChange = (value) => {
        setUpdatedBouquet({...updatedBouquet, price: value});
    };

    const handleQuantityChange = (value) => {
        setUpdatedBouquet({...updatedBouquet, quantity: value});
    };

    const updateBouquet = async (e) => {
        //e.preventDefault();
        if (!bouquet) return;
        let changedBouquetRu, changedBouquetEn;

        if (locale === 'ru') {
            changedBouquetRu = {
                id: bouquet.id,
                name: updatedBouquet.name,
                price: updatedBouquet.price,
                quantity: updatedBouquet.quantity
            };
            changedBouquetEn = {
                id: bouquet.id,
                name: getEnglishName(updatedBouquet.name),
                price: updatedBouquet.price,
                quantity: updatedBouquet.quantity
            };
        } else {
            changedBouquetEn = {
                id: bouquet.id,
                name: updatedBouquet.name,
                price: updatedBouquet.price,
                quantity: updatedBouquet.quantity
            };
            changedBouquetRu = {
                id: bouquet.id,
                name: getRussianName(updatedBouquet.name),
                price: updatedBouquet.price,
                quantity: updatedBouquet.quantity
            };
        }
        change(changedBouquetRu, changedBouquetEn);
    };

    return (
        <MyBouquetForm
            quantityChange={handleQuantityChange}
            priceChange={handlePriceChange}
            nameChange={handleNameChange}
            func={updateBouquet}
            bouquet={updatedBouquet}
            buttonText={intl.formatMessage({ id: 'updateBouquetButton' })}
        />
    );
};

export default BouquetFormChange;