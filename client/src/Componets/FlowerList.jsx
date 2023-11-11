import React from 'react';
import FlowerItem from './FlowerItem';
import { TransitionGroup } from "react-transition-group";
import { CSSTransition } from "react-transition-group";
import { useIntl } from "react-intl";

const FlowerList = ({ flowers, setModal, removeFlowerFromList, handleFlowerSelection, changeFlower, title, addToCart }) => {
  const intl = useIntl();

  if (!flowers.length) {
    return (
      <h1 style={{ textAlign: "center" }}>
        {intl.formatMessage({ id: 'noFlowersText' })}
      </h1>
    )
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        {title}
      </h1>
      <TransitionGroup>
        {flowers.map((flower, index) =>
          <CSSTransition
            key={flower.id}
            timeout={500}
            classNames="flower"
          >
            <FlowerItem
              removeFlowerFromList={removeFlowerFromList}
              handleFlowerSelection={handleFlowerSelection}
              setModal={setModal}
              changeFlower={changeFlower}
              addToCart={addToCart}
              number={index + 1}
              flower={flower}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default FlowerList;
