import React, { useContext, useEffect } from "react";
import { useState } from "react";
import AppContext from "../../context";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
function Card({
  props,
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
  const [isLoading, setIsLoading] = useState(true); // Состояние загрузки

  useEffect(() => {
    // Задержка на 3 секунды
    const timer = setTimeout(() => {
      setIsLoading(false); // Отключение заглушки
    }, 1500);
  }, []);

  return (
    <div>
      {isLoading ? (
        <ContentLoader
          speed={2}
          width={250}
          height={250}
          viewBox="0 0 200 230"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          {...props}
        >
          <rect x="146" y="176" rx="7" ry="7" width="44" height="42" />
          <rect x="8" y="144" rx="3" ry="3" width="134" height="14" />
          <rect x="7" y="118" rx="3" ry="3" width="180" height="12" />
          <rect x="8" y="171" rx="4" ry="4" width="107" height="14" />
          <rect x="9" y="203" rx="3" ry="3" width="97" height="14" />
          <rect x="6" y="4" rx="14" ry="14" width="186" height="125" />
        </ContentLoader>
      ) : (
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
                src={
                  isItemAdded(id) ? "/img/btn-chek.svg" : "/img/btn-plus.svg"
                }
                alt="Plus"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
