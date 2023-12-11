import React, {useContext, useEffect, useState} from 'react';
import {LocaleContext} from "../Contexts";
import {useIntl} from "react-intl";
import {
    englishNameDictionary,
    russianNameDictionary
} from "../Dictionaries/MyDictionary";
import MyBouquetForm from "./UI/forms/MyBouquetForm";
import {v4 as uuidv4} from 'uuid';

const BouquetFormAdd = ({add}) => {
    const {locale, setLocale} = useContext(LocaleContext);
    const intl = useIntl();

    const getEnglishName = (name) => {
        return englishNameDictionary[name];
    };

    const getRussianName = (name) => {
        return russianNameDictionary[name];
    };

    const [bouquet, setBouquet] = useState({name: '', price: '', amount: ''});

    useEffect(() => {
        setBouquet({name: '', price: '', amount: ''});
    }, [locale])

    const handleNameChange = (value) => {
        setBouquet({...bouquet, name: value});
    };

    const handlePriceChange = (value) => {
        setBouquet({...bouquet, price: value});
    };

    const handleAmountChange = (value) => {
        setBouquet({...bouquet, amount: value});
    };

    const addNewBouquet = async () => {
        let newBouquetRu, newBouquetEn;
        const bouquetId = uuidv4();

        if (locale === 'ru') {
            newBouquetRu = {
                id: bouquetId,
                name: bouquet.name,
                price: bouquet.price,
                amount: bouquet.amount
            };
            newBouquetEn = {
                id: bouquetId,
                name: getEnglishName(bouquet.name),
                price: bouquet.price,
                amount: bouquet.amount
            };
        } else {
            newBouquetEn = {
                id: bouquetId,
                name: bouquet.name,
                price: bouquet.price,
                amount: bouquet.amount
            };
            newBouquetRu = {
                id: bouquetId,
                name: getRussianName(bouquet.name),
                price: bouquet.price,
                amount: bouquet.amount
            };
        }
        add(newBouquetRu, newBouquetEn);
    };

    return (
        <MyBouquetForm
            amountChange={handleAmountChange}
            priceChange={handlePriceChange}
            nameChange={handleNameChange}
            func={addNewBouquet}
            bouquet={bouquet}
            buttonText={intl.formatMessage({id: 'addBouquetButton'})}
        />
    );
};

export default BouquetFormAdd;