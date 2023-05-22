import React, { useState } from "react";
import Card from "../components/Card";
import EditItemForm from "../components/Card/EditItemForm";
import Modal from "react-bootstrap/Modal";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Home = ({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,

  onAddToCart,
}) => {
  const [editingItemId, setEditingItemId] = useState(null);

  const handleEditItem = (id) => {
    setEditingItemId(id);
  };

  const handleCloseEditForm = () => {
    setEditingItemId(null);
  };

  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>{searchValue ? `Поиск: ${searchValue}` : "Все часы"}</h1>
        <div className="search-block d-flex">
          <FormControl
            sx={{
              m: 1,
              minWidth: 120,
              marginRight: 5,
              border: "1px solid #fffff",
            }}
            size="small"
          >
            <InputLabel id="demo-select-small-label">Category</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={searchValue}
              label="category"
              onChange={onChangeSearchInput}
            >
              <MenuItem value="">
                <em></em>
              </MenuItem>
              <MenuItem value={""}>All</MenuItem>
              <MenuItem value={"Apple watch"}>Apple watch</MenuItem>
              <MenuItem value={"Mi watch"}>Mi watch</MenuItem>
              <MenuItem value={"Hublot watch"}>Hublot watch</MenuItem>
              <MenuItem value={"Casio watch"}>Casio watch</MenuItem>
            </Select>
          </FormControl>
          <img src="/img/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear cu-p"
              src="/img/btn-remove.svg"
              alt="Clear"
            />
          )}

          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {items
          .filter((item) => item.title && item.title.includes(searchValue))

          .map((item, index) => (
            <div key={index}>
              {editingItemId === item.id ? (
                <Modal show={true} onHide={handleCloseEditForm}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <EditItemForm
                      itemId={editingItemId}
                      onClose={handleCloseEditForm}
                    />
                  </Modal.Body>
                </Modal>
              ) : (
                <Card
                  onFavorite={(obj) => onAddToFavorite(obj)}
                  onPlus={(obj) => onAddToCart(obj)}
                  onEdit={() => handleEditItem(item.id)}
                  {...item}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
