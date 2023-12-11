import React, {useContext} from 'react';
import {useIntl} from "react-intl";
import {LocaleContext} from "../../../Contexts";
import MySelect from "../selects/MySlect";
import MyInput from "../inputs/MyInput";
import cls from "./MyForm.module.css";

const MyBouquetForm = ({quantityChange, priceChange, nameChange, func, bouquet, buttonText}) => {
    const intl = useIntl();
    const {locale, setLocale} = useContext(LocaleContext);

    const isFormValid = () => {
        return bouquet.name !== '' && bouquet.price !== '' && bouquet.color !== '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            func();
        } else {
            alert(intl.formatMessage({id: 'unfilledFields'}));
        }
    };

    return (
        <form>
            <MySelect
                defaultValue={intl.formatMessage({id: 'chooseBouquet'})}
                value={bouquet.name}
                onChange={nameChange}
                options={[
                    {value: locale === "ru" ? "Роза" : "Rose", name: intl.formatMessage({id: 'rose'})},
                    {value: locale === "ru" ? "Тюльпан" : "Tulip", name: intl.formatMessage({id: 'tulip'})},
                    {value: locale === "ru" ? "Орхидея" : "Orchid", name: intl.formatMessage({id: 'orchid'})},
                    {value: locale === "ru" ? "Ирис" : "Iris", name: intl.formatMessage({id: 'iris'})},
                    {value: locale === "ru" ? "Пион" : "Peon", name: intl.formatMessage({id: 'peon'})},
                    {value: locale === "ru" ? "Гвоздика" : "Carnation", name: intl.formatMessage({id: 'carnation'})},
                    {value: locale === "ru" ? "Лилия" : "Lily", name: intl.formatMessage({id: 'lily'})},
                    {value: locale === "ru" ? "Фиалка" : "Violet", name: intl.formatMessage({id: 'violet'})},
                    {value: locale === "ru" ? "Нарцисс" : "Daffodil", name: intl.formatMessage({id: 'daffodil'})},
                    {
                        value: locale === "ru" ? "Хризантема" : "Chrysanthemum",
                        name: intl.formatMessage({id: 'chrysanthemum'})
                    }
                ]}
            />
            <MyInput
                value={bouquet.quantity}
                onChange={e => quantityChange(e.target.value)}
                type="text"
                placeholder={intl.formatMessage({id: 'quantityPlaceholder'})}
            />
            <MyInput
                value={bouquet.price}
                onChange={e => priceChange(e.target.value)}
                type="text"
                placeholder={intl.formatMessage({id: 'pricePlaceholder'})}
            />
            <button className={cls.BTN} onClick={handleSubmit}>{buttonText}</button>
        </form>
    );
};

export default MyBouquetForm;