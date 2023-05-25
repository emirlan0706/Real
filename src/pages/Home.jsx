import React, { useState } from "react";
import Card from "../components/Card";
import EditItemForm from "../components/Card/EditItemForm";
import Modal from "react-bootstrap/Modal";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEMS_PER_PAGE = 12;

const Home = ({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleEditItem = (id) => {
    const item = items.find((item) => item.id === id);
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(375));

  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1 className="searchAdaptive">
          {searchValue ? `Поиск: ${searchValue}` : "Все часы"}
        </h1>
        <div className="search-block d-flex categoryAdaptive">
          <FormControl
            sx={{
              m: 1,
              minWidth: 120,
              marginRight: 5,
              border: "1px solid #fffff",
              ...(isSmallScreen && {
                minWidth: "220px", // Adjust minWidth for small screens (375 width)
              }),
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
          <img src="/img/search.svg" alt="Search" className="serhico" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="searchAdaptive clear cu-p "
              src="/img/btn-remove.svg"
              alt="Clear"
            />
          )}

          <input
            className="inpserth"
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>

      <div className="d-flex flex-wrap adptiveCard">
        {currentItems
          .filter((item) => item.title && item.title.includes(searchValue))
          .map((item, index) => (
            <div key={index}>
              {isEditModalOpen && editingItem?.id === item.id ? (
                <EditItemForm
                  itemId={editingItem.id}
                  onClose={handleCloseEditModal}
                />
              ) : (
                <Card
                  className="flex-wrap cardMar"
                  onFavorite={(obj) => onAddToFavorite(obj)}
                  onPlus={(obj) => onAddToCart(obj)}
                  onEdit={() => handleEditItem(item.id)}
                  {...item}
                />
              )}
            </div>
          ))}
      </div>

      <div className="pagination">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default Home;
