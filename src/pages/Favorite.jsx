import React from "react";
import Card from "../components/Card/index";
import AppContext from "../context";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Favorite = () => {
  const { favorites, onAddToFavorite = { onAddToFavorite } } =
    useContext(AppContext);

  return (
    <div>
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>
            <Link to={"/"}>
              <img src="/img/prev1.png" alt="nazad" className="prev1" />
              Мои избранные
            </Link>
          </h1>
        </div>

        <div className="d-flex flex-wrap">
          {favorites.map((item, index) => (
            <Card
              key={index}
              favorited={true}
              onFavorite={(obj) => onAddToFavorite(obj)}
              {...item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
