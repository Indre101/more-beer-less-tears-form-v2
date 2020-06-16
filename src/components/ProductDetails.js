import React, { useEffect } from "react";
import { Button } from "./Buttons";
import gsap from "gsap";

const ProductDetails = (props) => {
  const { beer, setbeerCount, beerCount, createOrder } = props;

  // animate gsap elements in
  useEffect(() => {
    gsap.from(".animUp", { duration: 1, y: 50, opacity: 0, stagger: 0.5 });
  }, [beer]);
  return (
    <div className="main-wrapper">
      <div className="product-page-layout">
        <div className="product-image-container animUp">
          <img
            className="product-image"
            src={require(`../assets/images/${beer.label}`)}
            alt="beer"></img>
        </div>
        <section className="product-info animUp">
          <h1>{beer.name}</h1>
          <h2>{beer.category}</h2>
          <blockquote>
            <p>{beer.description.overallImpression}</p>
          </blockquote>
          <h2>{beer.price}kr</h2>
          <div className="single-beer-counter">
            <Button
              onClick={() =>
                setbeerCount((prevBeeerCount) =>
                  prevBeeerCount === 0 ? 0 : prevBeeerCount - 1
                )
              }
              type="button"
              buttonStyle="btn--counter--outline">
              -
            </Button>
            <h2>{beerCount}</h2>
            <Button
              onClick={() => setbeerCount(beerCount + 1)}
              type="button"
              buttonStyle="btn--counter--outline">
              +
            </Button>
          </div>
          <Button onClick={createOrder}>Add to cart</Button>
        </section>
        <section className="product-main-description animUp">
          <h2>Appearance</h2>
          <p>{beer.description.appearance}</p>
          <h2>Flavor</h2>
          <p>{beer.description.flavor}</p>
          <h2>Aroma</h2>
          <p>{beer.description.aroma}</p>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;
