import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";
import AppContext from "../context";

let APIORDERS = " http://localhost:8000/orders";
const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { onAddToFavorite, onAddToCart } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(APIORDERS);
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
      } catch (error) {
        alert("order zakaz");
      }
    })();
  }, []);

  return (
    <div>
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Мои покупки</h1>
        </div>

        <div className="d-flex flex-wrap">
          {orders.map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
