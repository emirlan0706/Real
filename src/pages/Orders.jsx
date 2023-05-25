import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import AppContext from "../context";

const Orders = ({ id }) => {
  const { setCartItems } = useContext(AppContext); // Accessing setCartItems from AppContext

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/orders");
        setOrders(data);
      } catch (error) {
        alert("Ошибка при получении заказов");
      }
    })();
  }, []);

  async function deleteOrder(orderId) {
    try {
      await axios.delete(`http://localhost:8000/orders/${orderId}`);
      console.log("Успешно удален заказ с orderId:", orderId);
      // Обновить состояние заказов после успешного удаления
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
    } catch (error) {
      console.error("Ошибка при удалении заказа с orderId:", orderId, error);
    }
  }

  async function deleteAllOrders() {
    try {
      await Promise.all(
        orders.map((order) =>
          Promise.all(
            order.items.map((item) =>
              axios.delete(
                `http://localhost:8000/orders/${order.id}/items/${item.id}`
              )
            )
          )
        )
      );
      console.log("Успешно удалены все товары");
      // Обновить состояние заказов после успешного удаления
      setOrders([]);
    } catch (error) {
      console.error("Ошибка при удалении всех товаров", error);
    }
  }

  return (
    <div>
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1 className="d-flex">
            <Link to={"/"}>
              <img src="/img/prev1.png" alt="назад" className="prev1" />
              Мои покупки
            </Link>
          </h1>
        </div>

        <div className="d-flex flex-wrap">
          {orders.map((order) => (
            <div key={order.id}>
              {order.items.map((item) => (
                <Card key={item.id} {...item} />
              ))}
              <button className="alert" onClick={() => deleteOrder(order.id)}>
                Удалить заказ #{order.id}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
