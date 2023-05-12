import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context";

const Header = (props) => {
  const { cartItems } = useContext(AppContext);

  const totalPrise = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to={"/"}>
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="Logotype" />
          <div>
            <h3>REACT SNEAKERS</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex align-center">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="/img/Group.svg" alt="Cart" />
          <span> {totalPrise} руб</span>
        </li>
        <li className="mr-10 cu-p">
          <Link to={"/favorites"}>
            <img width={18} height={18} src="/img/fav.svg" alt="favorites" />
          </Link>
        </li>
        <li>
          <Link to={"/orders"}>
            <img width={18} height={18} src="/img/Union.svg" alt="favorites" />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
