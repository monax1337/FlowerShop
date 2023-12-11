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
        amount: bouquet ? bouquet.amount : '',
        price: ''
    });

    useEffect(() => {
        setUpdatedBouquet({name: '', price: '', amount: ''});
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

    const handleAmountChange = (value) => {
        setUpdatedBouquet({...updatedBouquet, amount: value});
    };

    const updateBouquet = async () => {
        if (!bouquet) return;
        let changedBouquetRu, changedBouquetEn;

        if (locale === 'ru') {
            changedBouquetRu = {
                id: bouquet.id,
                name: updatedBouquet.name,
                price: updatedBouquet.price,
                amount: updatedBouquet.amount
            };
            changedBouquetEn = {
                id: bouquet.id,
                name: getEnglishName(updatedBouquet.name),
                price: updatedBouquet.price,
                amount: updatedBouquet.amount
            };
        } else {
            changedBouquetEn = {
                id: bouquet.id,
                name: updatedBouquet.name,
                price: updatedBouquet.price,
                amount: updatedBouquet.amount
            };
            changedBouquetRu = {
                id: bouquet.id,
                name: getRussianName(updatedBouquet.name),
                price: updatedBouquet.price,
                amount: updatedBouquet.amount
            };
        }
        change(changedBouquetRu, changedBouquetEn);
    };

    return (
        <MyBouquetForm
            amountChange={handleAmountChange}
            priceChange={handlePriceChange}
            nameChange={handleNameChange}
            func={updateBouquet}
            bouquet={updatedBouquet}
            buttonText={intl.formatMessage({id: 'updateBouquetButton'})}
        />
    );
};

export default BouquetFormChange;