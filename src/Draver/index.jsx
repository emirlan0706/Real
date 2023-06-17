import React, { useContext } from "react";
import { useState } from "react";
import Info from "../components/Info";
import AppContext from "../context";
import axios from "axios";
import styles from "../Draver/drawer.module.scss";

let APIORDERS = " http://localhost:8000/orders";
let APICART = "http://localhost:8000/cart";

function Drawer({ onClose, items, onRemove = [], opened }) {
  const { cartItems, setCartItems } = useContext(AppContext);
  const [orderId, setOrderId] = useState(null);
  const [isOrderComplete, setisOrderComplete] = useState(false);

  const totalPrise = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  const onClickOrder = async () => {
    try {
      const { data } = await axios.post(APIORDERS, { items: cartItems });
      setOrderId(data.id);
      setisOrderComplete(true);
      setCartItems([]);
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`${APICART}/${item.id}`);
        onRemove(item.id);
      }
    } catch (error) {
      console.log("vjsdfh,abfcakjfhveahcbaklewhj cajehfc dAj");
    }
  };

  return (
    <div>
      <div
        className={`${styles.overlay} ${opened ? styles.overlayVisable : ""}`}
      >
        <div className={styles.drawer}>
          <h2 className="d-flex justify-between mb-30 ">
            Корзина{" "}
            <img
              onClick={onClose}
              className="removeBtn cu-p"
              src="/img/btn-remove.svg"
              alt="Remove"
            />
          </h2>

          {items.length > 0 ? (
            <div className=" d-flex flex-column flex">
              <div className="item">
                {items.map((obj) => (
                  <div
                    key={obj.id}
                    className="cartItem d-flex align-center mb-20"
                  >
                    <div
                      style={{ backgroundImage: `url(${obj.imageUrl})` }}
                      className="cartItemImg"
                    ></div>
                    <div className="mr-20 ">
                      <p className="mb-5">{obj.title}</p>
                      <b>{obj.price} руб.</b>
                    </div>
                    <img
                      onClick={() => onRemove(obj.id)}
                      className="removeBtn"
                      src="/img/btn-remove.svg"
                      alt="Remove"
                    />
                  </div>
                ))}
              </div>
              <div className="cartTotalBlock">
                <ul>
                  <li>
                    <span>Итого: </span>
                    <div></div>
                    <b>{totalPrise} руб. </b>
                  </li>
                  <li>
                    <span>Налог 5%: </span>
                    <div></div>
                    <b>{(totalPrise / 100) * 5} руб. </b>
                  </li>
                </ul>

                <button onClick={onClickOrder} className="greenButton">
                  Оформить заказ <img src="/img/btn-of.svg" alt="" />
                </button>
              </div>
            </div>
          ) : (
            <Info
              title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
              description={
                isOrderComplete
                  ? `Ваш заказ # ${orderId} скоро будет передан курьерской доставке`
                  : " Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
              }
              image={
                isOrderComplete ? "/img/letRes.jpg" : "/img/empty-cart.jpg"
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Drawer;
