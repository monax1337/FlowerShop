import React, { useContext } from "react";
import MySelect from "../selects/MySlect";
import MyInput from "../inputs/MyInput";
import MyButton from "../buttons/MyButton";
import { useIntl } from "react-intl";
import { LocaleContext } from "../../../Contexts";

const MyForm = ({ colorChange, priceChange, nameChange, func, flower, buttonText }) => {
    const intl = useIntl();
    const { locale, setLocale } = useContext(LocaleContext);

    return (
        <form>
            <MySelect
                defaultValue={intl.formatMessage({ id: 'chooseFlower' })}
                value={flower.name}
                onChange={nameChange}
                options={[
                    { value: locale === "ru" ? "Роза" : "Rose", name: intl.formatMessage({ id: 'rose' }) },
                    { value: locale === "ru" ? "Тюльпан" : "Tulip", name: intl.formatMessage({ id: 'tulip' }) },
                    { value: locale === "ru" ? "Орхидея" : "Orchid", name: intl.formatMessage({ id: 'orchid' }) },
                    { value: locale === "ru" ? "Ирис" : "Iris", name: intl.formatMessage({ id: 'iris' }) },
                    { value: locale === "ru" ? "Пион" : "Peon", name: intl.formatMessage({ id: 'peon' }) },
                    { value: locale === "ru" ? "Гвоздика" : "Carnation", name: intl.formatMessage({ id: 'carnation' }) },
                    { value: locale === "ru" ? "Лилия" : "Lily", name: intl.formatMessage({ id: 'lily' }) },
                    { value: locale === "ru" ? "Фиалка" : "Violet", name: intl.formatMessage({ id: 'violet' }) },
                    { value: locale === "ru" ? "Нарцисс" : "Daffodil", name: intl.formatMessage({ id: 'daffodil' }) },
                    { value: locale === "ru" ? "Хризантема" : "Chrysanthemum", name: intl.formatMessage({ id: 'chrysanthemum' }) }
                ]}
            />
            <MySelect
                defaultValue={intl.formatMessage({ id: 'chooseColor' })}
                value={flower.color}
                onChange={colorChange}
                options={[
                    { value: locale === "ru" ? "Синий" : "Blue", name: intl.formatMessage({ id: 'blue' }) },
                    { value: locale === "ru" ? "Красный" : "Red", name: intl.formatMessage({ id: 'red' }) },
                    { value: locale === "ru" ? "Белый" : "White", name: intl.formatMessage({ id: 'white' }) },
                    { value: locale === "ru" ? "Желтый" : "Yellow", name: intl.formatMessage({ id: 'yellow' }) },
                    { value: locale === "ru" ? "Фиолетовый" : "Purple", name: intl.formatMessage({ id: 'purple' }) },
                    { value: locale === "ru" ? "Розовый" : "Pink", name: intl.formatMessage({ id: 'pink' }) },
                    { value: locale === "ru" ? "Оранжевый" : "Orange", name: intl.formatMessage({ id: 'orange' }) }
                ]}
            />
            <MyInput
                value={flower.price}
                onChange={e => priceChange(e.target.value)}
                type="text"
                placeholder={intl.formatMessage({ id: 'pricePlaceholder' })}
            />
            <MyButton onClick={func}>{buttonText}</MyButton>
        </form>
    )
};

export default MyForm