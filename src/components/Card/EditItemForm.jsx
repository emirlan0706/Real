import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

// Add a custom style for the modal
const customModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    width: "400px",
    height: "300px",
    margin: "auto",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "20px",
  },
};

function EditItemForm({ itemId, onClose }) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true); // Track the open/close state of the modal

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
        price: parseInt(price), // Parse the price as an integer
        category,
      });
      onClose(); // Close the edit form
    } catch (error) {
      console.log("Error updating item", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    onClose(); // Close the edit form
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customModalStyles}
      contentLabel="Edit Item"
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <label>
            Title:
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <button type="submit">Update</button>
          <button onClick={closeModal}>Cancel</button>
        </form>
      )}
    </Modal>
  );
}

export default EditItemForm;
