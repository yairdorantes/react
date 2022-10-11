import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "./stylesCards.css";

import { EffectCards, Mousewheel } from "swiper";
import wordSound from "../media/cards/audio.png";

import Loader from "./Loader";
import AboutUser from "./AboutUser";
const Cards = () => {
  let url = "http://127.0.0.1:8000/api/cards/";
  const [isActive, setIsActive] = useState(true);

  const [cards, setCards] = useState();
  const params = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  const fetchAPi = async () => {
    const response = await fetch(url, params);
    const responseJSON = await response.json();
    setCards(responseJSON);
    // console.log(responseJSON);
  };

  useEffect(() => {
    fetchAPi();
  }, []);

  const handleDisplay = (e) => {
    isActive ? setIsActive(false) : setIsActive(true);
    // console.log(e.target.textContent);
  };

  var speechSynthesis = require("speech-synthesis");

  // var cont = -1;
  // var arr = ["#1F1A24", "#282A36"];
  return (
    <>
      <AboutUser></AboutUser>

      <div className="all-cards">
        <Swiper
          mousewheel={true}
          className="mySwiper"
          effect={"cards"}
          modules={[EffectCards, Mousewheel]}
        >
          {!cards ? (
            <Loader></Loader>
          ) : (
            cards.cards.map((card, key) => {
              return (
                <SwiperSlide
                  style={{
                    borderColor: "white",
                    backgroundImage: "url(" + card.imageURL + ")",
                  }}
                  className="swiper-slide-card"
                  key={card.id}
                >
                  <div className="container-card">
                    <div className="card">
                      {/* <img className="image-cards" src={card.imageURL} alt="" /> */}
                      <div className="contenido-card">
                        <h3 onClick={handleDisplay} className="card-text">
                          {isActive ? card.cardTitle : card.cardMeaning}
                        </h3>
                        <button
                          className="btn-sound-card"
                          onClick={() => {
                            speechSynthesis(card.cardTitle);
                            // console.log(card.cardTitle);
                          }}
                        >
                          <img className="word-sound" src={wordSound} alt="" />
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })
          )}
        </Swiper>
      </div>
    </>
  );
};

export default Cards;
