import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import axios from "axios";

const API_ITEMS = "http://localhost:8000/items";

function Card({
  id,
  onFavorite,
  imageUrl,
  title,
  price,
  onPlus,
  favorited = false,
  added = false,
  onRemove,
  onEdit, // New prop for handling the edit functionality
}) {
  const { isItemAdded, items, setItems } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);
  const [isLoading, setIsLoading] = useState(true);

  const onClickPlus = () => {
    onPlus({ id, title, imageUrl, price });
  };

  const onClickDelete = async (itemId) => {
    try {
      await axios.delete(`${API_ITEMS}/${itemId}`);
      setItems(items.filter((item) => item.id !== itemId));
    } catch (error) {
      console.log("Ошибка при удалении товара", error);
    }
  };

  const onClickFavorite = () => {
    onFavorite({ id, title, imageUrl, price });
    setIsFavorite(!isFavorite);
  };

  const onClickEdit = () => {
    onEdit(id); // Call the onEdit prop function with the item's ID
  };

  useEffect(() => {
    setIsLoading(false);
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
            <button
              className={styles.delete}
              onClick={() => onClickDelete(id)}
              alt="Delete"
            >
              delete
            </button>
            <button
              className={styles.edit} // New CSS class for the edit button
              onClick={onClickEdit} // Call the onClickEdit function on button click
              alt="Edit"
            >
              edit
            </button>
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
