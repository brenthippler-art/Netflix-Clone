import React, { useEffect, useRef, useState } from "react";
import "./Titlecards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const Titlecards = ({ title, category }) => {
  
  const [apiData, setApiData] = useState([]);
  
  /* Horizontal scroll using mouse wheel */
  const cardsRef = useRef();

  /* API Call */
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };
  /* End of API Call */

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };
  useEffect(() => {
    /* API Fetch */
    fetch(
      `https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));
    /* End of API Fetch */

    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);
  /* End of horizontal scroll using mouse wheel */

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to ={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Titlecards;
