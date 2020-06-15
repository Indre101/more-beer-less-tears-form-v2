import React, { useState, useEffect } from "react";
import DataBase from "../modules/DataBase";
import TopBeer from "./TopBeer";
import "../App.scss";
import BeerCardShop from "./BeerCardShop";
import gsap from "gsap";

function Shop(props) {
  useEffect(() => {
    if (props.preloaderPlayed) {
      const tl = gsap.timeline();
      tl.to(".animList", { opacity: 1, x: 0, duration: 0.5 });
      tl.to("h1", { opacity: 1, x: 0, duration: 0.5 });
    }
  }, [props.beer, props.preloaderPlayed]);

  const [beers, setBeers] = useState([]);
  const [beersOnTap, setBeersOnTap] = useState([]);
  const [beersAvailableTobuy, setbeersAvailableTobuy] = useState([]);

  // get beers on tap
  useEffect(() => {
    const getData = async () => {
      const Beers = await DataBase.GetData();
      setBeersOnTap(Beers.taps);
    };
    getData(beers);
    return;
  }, []); // eslint-disable-line

  // get all beer data
  useEffect(() => {
    const getData = async () => {
      const barData = await DataBase.GetBeerTypes();
      setBeers(barData);
    };
    getData(beersOnTap);
    return;
  }, []); // eslint-disable-line

  //get the beer data that is only on the taps and unique
  useEffect(() => {
    //gets the beer names that would not repeat
    const uniqueBeerNamesOnTap = [
      ...new Set(beersOnTap.map((beerName) => beerName.beer)),
    ];

    let i = 0;
    //filters by the beer name throught the beertypes data and  return array with  objects containing beer info
    const beersAvailableToBuyFiltered = uniqueBeerNamesOnTap.map((beerName) => {
      i++;
      const beerObj = beers.find((type) => {
        return type.name === beerName;
      });
      return { ...beerObj, id: i, price: 50 };
    });
    setbeersAvailableTobuy(beersAvailableToBuyFiltered);
  }, [beers, beersOnTap]);

  const beersAvailableTobuyElement = beersAvailableTobuy.map((beer) => (
    <BeerCardShop
      key={beer.id}
      beer={beer}
      setorder={props.setorder}
      orders={props.orders}
      preloaderPlayed={props.preloaderPlayed}
    />
  ));

  return (
    <div className="main-wrapper">
      <section className="beer-list-container">
        <h1>Beers</h1>
        <div className="beer-list animList">{beersAvailableTobuyElement}</div>
      </section>

      <section className="stats-section">
        <h1>Staff Choice</h1>
        <TopBeer />
      </section>
    </div>
  );
}

export default Shop;
