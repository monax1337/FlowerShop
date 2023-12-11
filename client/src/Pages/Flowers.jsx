import React, {useContext, useEffect, useState} from "react";
import FlowerList from "../Componets/FlowerList";
import {LocaleContext} from "../Contexts";
import FlowerFilter from "../Componets/FlowerFilter";
import {useFlowers} from "../hooks/useFlowers";
import FlowerService from "../API/FlowerService";
import {useIntl} from "react-intl";
import {
    englishNameDictionary, englishColorDictionary, russianNameDictionary, russianColorDictionary,
} from "../Dictionaries/MyDictionary";
import BouquetList from "../Componets/BouquetList";

const Flowers = () => {
    const intl = useIntl();
    const [flowers, setFlowers] = useState([]);
    const [bouquets, setBouquets] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const sortedAndSearchedFlowers = useFlowers(flowers, filter.sort, filter.query);
    const {locale, setLocale} = useContext(LocaleContext);

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

    const getFlowers = async () => {
        const fetchedFlowers = await FlowerService.getAllFlowers(selectedLanguage);
        setFlowers(fetchedFlowers);
    };

    const getBouquets = async () => {
        const fetchedBouquets = await FlowerService.getAllBouquets(selectedLanguage);
        setBouquets(fetchedBouquets);
    };

    useEffect(() => {
        getFlowers();
        getBouquets();
    }, [locale]);

    const addToCart = async (flower) => {
        try {
            let cartFlowerRu, cartFlowerEn;

            const flowersRu = await FlowerService.getAllCartFlowers('russian');
            const flowersEn = await FlowerService.getAllCartFlowers('english');

            const existingFlowerInCartRuIndex = flowersRu.findIndex((item) => (selectedLanguage === 'russian' ? item.name === flower.name : getRussianName(flower.name) === item.name) && (selectedLanguage === 'russian' ? item.color === flower.color : getRussianColor(flower.color) === item.color));
            const existingFlowerInCartEnIndex = flowersEn.findIndex((item) => (selectedLanguage === 'english' ? item.name === flower.name : getEnglishName(flower.name) === item.name) && (selectedLanguage === 'english' ? item.color === flower.color : getEnglishColor(flower.color) === item.color));

            if (existingFlowerInCartRuIndex !== -1) {
                flowersRu[existingFlowerInCartRuIndex].quantity += 1;
                await FlowerService.updateCartFlowerQuantity(existingFlowerInCartRuIndex, flowersRu[existingFlowerInCartRuIndex].quantity, 'russian');
            } else {
                cartFlowerRu = {
                    id: flower.id,
                    name: selectedLanguage === 'russian' ? flower.name : getRussianName(flower.name),
                    price: flower.price,
                    color: selectedLanguage === 'russian' ? flower.color : getRussianColor(flower.color),
                    quantity: 1
                };
                await FlowerService.addFlowerToCart(cartFlowerRu, 'russian');
            }

            if (existingFlowerInCartEnIndex !== -1) {
                flowersEn[existingFlowerInCartEnIndex].quantity += 1;
                await FlowerService.updateCartFlowerQuantity(existingFlowerInCartEnIndex, flowersEn[existingFlowerInCartEnIndex].quantity, 'english');
            } else {
                cartFlowerEn = {
                    id: flower.id,
                    name: selectedLanguage === 'english' ? flower.name : getEnglishName(flower.name),
                    price: flower.price,
                    color: selectedLanguage === 'english' ? flower.color : getEnglishColor(flower.color),
                    quantity: 1
                };
                await FlowerService.addFlowerToCart(cartFlowerEn, 'english');
            }
        } catch (error) {
            console.error('Ошибка при добавлении цветка в корзину:', error);
        }
    };

    const addBouquetToCart = async (bouquet) => {
        try {
            let cartBouquetRu, cartBouquetEn;

            const bouquetsRu = await FlowerService.getAllCartFlowers('russian');
            const bouquetsEn = await FlowerService.getAllCartFlowers('english');

            const existingBouquetInCartRuIndex = bouquetsRu.findIndex((item) => (selectedLanguage === 'russian' ? item.name === bouquet.name : getRussianName(bouquet.name) === item.name) && (item.color === bouquet.color));
            const existingBouquetInCartEnIndex = bouquetsEn.findIndex((item) => (selectedLanguage === 'english' ? item.name === bouquet.name : getEnglishName(bouquet.name) === item.name) && (item.color === bouquet.color));

            if (existingBouquetInCartRuIndex !== -1) {
                bouquetsRu[existingBouquetInCartRuIndex].quantity += 1;
                await FlowerService.updateCartFlowerQuantity(existingBouquetInCartRuIndex, bouquetsRu[existingBouquetInCartRuIndex].quantity, 'russian');
            } else {
                cartBouquetRu = {
                    id: bouquet.id,
                    name: selectedLanguage === 'russian' ? bouquet.name : getRussianName(bouquet.name),
                    price: bouquet.price,
                    amount: bouquet.amount,
                    quantity: 1
                };
                await FlowerService.addFlowerToCart(cartBouquetRu, 'russian');
            }

            if (existingBouquetInCartEnIndex !== -1) {
                bouquetsEn[existingBouquetInCartEnIndex].quantity += 1;
                await FlowerService.updateCartFlowerQuantity(existingBouquetInCartEnIndex, bouquetsEn[existingBouquetInCartEnIndex].quantity, 'english');
            } else {
                cartBouquetEn = {
                    id: bouquet.id,
                    name: selectedLanguage === 'english' ? bouquet.name : getEnglishName(bouquet.name),
                    price: bouquet.price,
                    amount: bouquet.amount,
                    quantity: 1
                };
                await FlowerService.addFlowerToCart(cartBouquetEn, 'english');
            }
        } catch (error) {
            console.error('Ошибка при добавлении букета в корзину:', error);
        }
    }

    return (<div className="App">
        <BouquetList bouquets={bouquets} addToCart={addBouquetToCart}
                     title={intl.formatMessage({id: 'bouquetListTitle'})}/>
        <div>
            <FlowerFilter filter={filter} setFilter={setFilter}/>
            <FlowerList flowers={sortedAndSearchedFlowers} addToCart={addToCart}
                        title={intl.formatMessage({id: 'listTitle'})}/>
        </div>

    </div>)
};

export default Flowers;
