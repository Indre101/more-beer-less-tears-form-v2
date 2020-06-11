import React, { useState } from "react";

export default function OrderControl(props) {
  const { name } = props.beer;
  const { orders, setorder } = props.props;
  const [beerCount, setbeerCount] = useState(1);

  function getorderedBeeramount() {
    let amount;
    if (
      orders.length > 0 &&
      orders.filter((order) => order.name === name).length > 0
    ) {
      amount = orders
        .filter((order) => order.name === name)
        .map((order) => order.amount)
        .flat();
      return amount[0];
    } else {
      amount = 0;
    }
    return amount;
  }

  function createOrder() {
    const orderedBeeramount = getorderedBeeramount();

    const newBeerOrder = {
      name: props.beer.name,
      amount: orderedBeeramount + beerCount,
      price: props.beer.price,
    };

    setorder((prevOrders) => {
      const sameBeerOccurenceInOrder = prevOrders.filter(
        (prevBeerOr) => prevBeerOr.name === newBeerOrder.name
      );

      //if there is already a beer by the same name
      if (sameBeerOccurenceInOrder.length > 0) {
        const indexOfBeeWithTheSameName = prevOrders.findIndex(
          (prevBeerOrd) => prevBeerOrd.name === newBeerOrder.name
        );

        //Change the old order with the new
        prevOrders.splice(indexOfBeeWithTheSameName, 1, newBeerOrder);
        //return the changed order list

        return [...prevOrders];
      } else {
        //If there is no beer with the same name add it to the previous orders
        return [newBeerOrder, ...prevOrders];
      }
    });
  }
  return (
    <div>{props.render(beerCount, setbeerCount, createOrder, props.beer)}</div>
  );
}
