import React from "react";
import MyInput from "./UI/inputs/MyInput";
import MySelect from "./UI/selects/MySlect";
import { useIntl } from "react-intl";

const FlowerFilter = ({ filter, setFilter }) => {
    const intl = useIntl();

    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={e => setFilter({ ...filter, query: e.target.value })}
                placeholder={intl.formatMessage({ id: 'searchPlaceholder' })}
            />
            <MySelect
                defaultValue={intl.formatMessage({ id: 'sortDefault' })}
                value={filter.sort}
                onChange={selectedSort => setFilter({ ...filter, sort: selectedSort })}
                options={
                    [{
                        value: 'name',
                        name: intl.formatMessage({ id: 'sortByTitle' })
                    },
                    {
                        value: 'price',
                        name: intl.formatMessage({ id: 'sortByPrice' })
                    },
                    {
                        value: 'color',
                        name: intl.formatMessage({ id: 'sortByColor' })
                    }]
                }
            />
        </div>
    )
};

export default FlowerFilter;
