import React from "react";
import cardStyles from "./card.module.scss";

type CardType = {
    children: any,
    classname?: any
}

export const Card = ({ children, classname }: CardType) => {
    return (
        <div data-testid={"card"}
            className={`${cardStyles.card} ${classname}`}>
            {children}
        </div>
    )
}