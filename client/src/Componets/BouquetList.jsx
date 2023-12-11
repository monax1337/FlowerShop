import React from 'react';
import {useIntl} from "react-intl";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import BouquetItem from "./BouquetItem";

const BouquetList = ({bouquets, removeBouquetFromList, handleBouquetSelection, changeBouquet, title, addToCart}) => {
    const intl = useIntl();

    if (!bouquets || !bouquets.length) {
        return (<h1 style={{textAlign: "center"}}>
            {intl.formatMessage({id: 'noBouquetText'})}
        </h1>)
    }

    return (<div>
        <h1 style={{textAlign: "center", marginTop: "15px"}}>
            {title}
        </h1>
        <TransitionGroup>
            {bouquets.map((bouquet, index) => <CSSTransition
                key={bouquet.id}
                timeout={500}
                classNames="flower"
            >
                <BouquetItem
                    removeBouquetFromList={removeBouquetFromList}
                    handleBouquetSelection={handleBouquetSelection}
                    changeBouquet={changeBouquet}
                    addToCart={addToCart}
                    number={index + 1}
                    bouquet={bouquet}
                />
            </CSSTransition>)}
        </TransitionGroup>
    </div>);
};

export default BouquetList;