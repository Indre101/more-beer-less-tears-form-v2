import React, { useEffect } from "react";
import "../App.scss";
import OrderControl from "./OrderControl";
import ProductDetails from "./ProductDetails";

function Product(props) {
  const { beer } = props.location.state;
  return (
    <OrderControl
      {...props}
      beer={beer}
      render={(setbeerCount, beerCount, createOrder, beer) => (
        <ProductDetails
          setbeerCount={setbeerCount}
          beerCount={beerCount}
          createOrder={createOrder}
          beer={beer}
        />
      )}></OrderControl>
  );
}

export default Product;
