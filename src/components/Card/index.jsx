import React, { useContext } from "react";
import { useState } from "react";
import AppContext from "../../context";
import styles from "./Card.module.scss";
function Card({
  id,
  onFavorite,
  imageUrl,
  title,
  price,
  onPlus,
  favorited = false,
  added = false,
}) {
  const { isItemAdded } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const onClickPlus = () => {
    onPlus({ id, title, imageUrl, price });
  };

  const onClickFavorite = () => {
    onFavorite({ id, title, imageUrl, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        {onFavorite && (
          <img
            src={isFavorite ? "/img/liked.svg" : "/img/heart-unliked.svg"}
            alt="Unliked"
          />
        )}
      </div>
      <img width="100%" height={135} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        {onPlus && (
          <img
            className={styles.plus}
            onClick={onClickPlus}
            src={isItemAdded(id) ? "/img/btn-chek.svg" : "/img/btn-plus.svg"}
            alt="Plus"
          />
        )}
      </div>
    </div>
  );
}

export default Card;
