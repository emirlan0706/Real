import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const modalStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const formContainerStyles = {
  width: "400px",
  padding: "40px",
  backgroundColor: "#F5F5F5",
};

const formStyles = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

function EditItemForm({ itemId, onClose }) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await axios.get(
          `http://localhost:8000/items/${itemId}`
        );
        const itemData = response.data;
        setTitle(itemData.title);
        setImageUrl(itemData.imageUrl);
        setPrice(itemData.price);
        setCategory(itemData.category);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching item data", error);
      }
    }

    fetchItem();
  }, [itemId]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:8000/items/${itemId}`, {
        title,
        imageUrl,
        price: parseInt(price),
        category,
      });

      // Update the item data without refreshing the page
      const updatedItemData = { id: itemId, title, imageUrl, price, category };
      updateItemData(updatedItemData);

      closeModal();
    } catch (error) {
      console.log("Error updating item", error);
    }
  };

  const updateItemData = (updatedItemData) => {
    // Perform the necessary logic to update the item data in your component's state or any other state management solution you are using
    // For example, if you are using React state:
    // setItems((prevItems) => prevItems.map((item) => (item.id === updatedItemData.id ? updatedItemData : item)));
    // Replace the above example code with the appropriate logic for updating the item data
  };

  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={closeModal}
      aria-labelledby="edit-item-modal-title"
      style={modalStyles}
    >
      <Box sx={formContainerStyles}>
        {isLoading ? (
          <Typography variant="body1">Loading...</Typography>
        ) : (
          <form onSubmit={handleFormSubmit} style={formStyles}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              variant="outlined"
            />

            <FormControl fullWidth variant="outlined">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Casio"}>Casio</MenuItem>
                <MenuItem value={"Apple watch"}>Apple watch</MenuItem>
                <MenuItem value={"Mi watch"}>Mi watch</MenuItem>
                <MenuItem value={"Hublot watch"}>Hublot watch</MenuItem>
              </Select>
            </FormControl>

            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={closeModal} variant="contained" color="secondary">
              Cancel
            </Button>
          </form>
        )}
      </Box>
    </Modal>
  );
}

export default EditItemForm;
