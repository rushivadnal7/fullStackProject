import React from "react";
import CardItem from "./CardItem";

const CardList = ({ cards, searchedCard }) => {
  return (
    <>
      <div className="h-4/5 w-10/12   flex justify-between flex-wrap gap-3">
        {searchedCard !== null
          ? <CardItem card={searchedCard} />
          : Object.values(cards).map((card) => {
              return <CardItem key={card._id} card={card} />;
            })}
      </div>
    </>
  );
};

export default CardList;
