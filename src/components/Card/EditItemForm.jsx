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

const customModalStyles = {
  width: "400px",
  height: "350px",

  border: "none",

  padding: "20px",
};

function EditItemForm({ itemId, onClose }) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [rest, setRest] = useState([]);

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
      closeModal();
    } catch (error) {
      console.log("Error updating item", error);
    }
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
    >
      <Box
        sx={{
          ...customModalStyles,
          backgroundColor: "white",
          borderColor: "white",
          marginTop: "110px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading ? (
          <Typography variant="body1">Loading...</Typography>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              margin="normal"
            />

            <FormControl sx={{ m: 1, minWidth: 410 }} size="small">
              <InputLabel id="demo-select-small-label">Category</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="category"
                name="category"
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
                margin="normal"
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

            <Button
              sx={{ display: "flex", justifyContent: "flex-end" }}
              type="submit"
              variant="contained"
              color="success"
            >
              Save
            </Button>
            <Button onClick={closeModal} variant="contained" color="error">
              Cancel
            </Button>
          </form>
        )}
        {setRest}
      </Box>
    </Modal>
  );
}

export default EditItemForm;
