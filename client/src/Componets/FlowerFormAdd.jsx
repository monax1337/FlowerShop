import React, { useContext, useEffect, useState } from "react";
import MyForm from "./UI/forms/MyForm";
import { useIntl } from "react-intl";
import { LocaleContext } from "../Contexts";
import {
    englishNameDictionary,
    englishColorDictionary,
    russianNameDictionary,
    russianColorDictionary,
} from "../Dictionaries/MyDictionary";
import { v4 as uuidv4 } from 'uuid';

const FlowerFormAdd = ({ add }) => {
    const { locale, setLocale } = useContext(LocaleContext);
    const intl = useIntl();

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

    const [flower, setFlower] = useState({ name: '', price: '', color: '' });

    useEffect(() => {
        setFlower({ name: '', price: '', color: '' });
    }, [locale])

    const handleNameChange = (value) => {
        setFlower({ ...flower, name: value });
    };

    const handlePriceChange = (value) => {
        setFlower({ ...flower, price: value });
    };

    const handleColorChange = (value) => {
        setFlower({ ...flower, color: value });
    };

    const addNewFlower = async (e) => {
        e.preventDefault();
        let newFlowerRu, newFlowerEn;
        const flowerId = uuidv4();

        if (locale === 'ru') {
            newFlowerRu = {
                id: flowerId,
                name: flower.name,
                price: flower.price,
                color: flower.color
            };
            newFlowerEn = {
                id: flowerId,
                name: getEnglishName(flower.name),
                price: flower.price,
                color: getEnglishColor(flower.color)
            };
        } else {
            newFlowerEn = {
                id: flowerId,
                name: flower.name,
                price: flower.price,
                color: flower.color
            };
            newFlowerRu = {
                id: flowerId,
                name: getRussianName(flower.name),
                price: flower.price,
                color: getRussianColor(flower.color)
            };
        }
        add(newFlowerRu, newFlowerEn);
    };

    return (
        <MyForm
            colorChange={handleColorChange}
            priceChange={handlePriceChange}
            nameChange={handleNameChange}
            func={addNewFlower}
            flower={flower}
            buttonText={intl.formatMessage({ id: 'addFlowerButton' })}
        />
    );
};

export default FlowerFormAdd;
