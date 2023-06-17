import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context";

const Header = (props) => {
  const { cartItems } = useContext(AppContext);

  const totalPrise = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
        <img
          className="imgiog"
          width={40}
          height={40}
          src="https://cdn-icons-png.flaticon.com/128/5844/5844673.png"
          alt="Logotype"
        />
        <div>
          <h3>Swiss Time</h3>
          <p className="opacity-5 descrAdaptive ">
            Наручные часы всех известных брендов
          </p>
        </div>
      </div>

      <ul className="d-flex align-center">
        <li>
          <Link to={"add"}>
            <img
              width={38}
              height={38}
              src="https://t3.ftcdn.net/jpg/03/00/16/94/240_F_300169453_6xuLDQnnQUHnCJNctiI7Vzx8uJm20xow.jpg"
              alt=""
            />
          </Link>
        </li>
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={20} height={20} src="/img/korzina.png" alt="Cart" />
          <span className="totyalpri">{totalPrise} руб</span>
        </li>
        <li className="mr-10 cu-p">
          <Link to={"/favorites"}>
            <img
              className="favIc"
              width={30}
              height={30}
              src="https://t4.ftcdn.net/jpg/05/99/59/37/240_F_599593737_hARwisX4Gx5yXvK7KRcJPQhsX5ocToQS.jpg"
              alt="favorites"
            />
          </Link>
        </li>
        <li>
          <Link to={"/orders"}>
            <img
              className="moiPoc"
              width={21}
              height={21}
              src="/img/Union.svg"
              alt="favorites"
            />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
