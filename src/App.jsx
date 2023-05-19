import axios from "axios";
import Header from "./components/Header";
import Drawer from "./Draver";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";

import { createContext, useState } from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AppContext from "./context";
import Orders from "./pages/Orders";

function App() {
  let APIITEMS = " http://localhost:8000/items";
  let APICART = "http://localhost:8000/cart";
  let APIFAVORITES = "http://localhost:8000/favorites";

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const itemsResponse = await axios.get(APIITEMS);
        const cartResponse = await axios.get(APICART);
        const favoritesResponse = await axios.get(APIFAVORITES);

        setFavorites(favoritesResponse.data);
        setCartItems(cartResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("error in get zaproserd");
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        await axios.delete(`${APICART}/${obj.id}`);
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        await axios.post(APICART, obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("await in cart");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`${APICART}/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert("error in delete cart");
    }
  };

  const onAddToFavorite = async (obj) => {
    console.log(obj);
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`${APIFAVORITES}/${obj.id}`);
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(APIFAVORITES, obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("no favorites");
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={(obj) => {
                  onAddToCart(obj);
                }}
              />
            }
          />
          <Route path="/favorites" element={<Favorite />} />

          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
