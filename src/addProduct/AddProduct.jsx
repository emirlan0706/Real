import React, { useState } from "react";
import axios from "axios";
import styles from "./AddProductForm.module.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

let APIITEMS = " http://localhost:8000/items";

const AddProductForm = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "imageUrl":
        setImageUrl(value);
        break;
      case "category":
        setCategory(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      title,
      price,
      imageUrl,
      category,
    };

    axios
      .post(APIITEMS, newProduct)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    setTitle("");
    setPrice("");
    setImageUrl("");
    setCategory("");
  };

  return (
    <div className={styles.container}>
      <h2>Add a Product</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="title" className={styles.label}>
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleInputChange}
          className={styles.input}
        />

        <label htmlFor="price" className={styles.label}>
          Price
        </label>
        <input
          type="text"
          id="price"
          name="price"
          value={price}
          onChange={handleInputChange}
          className={styles.input}
        />

        <label htmlFor="imageUrl" className={styles.label}>
          Image URL
        </label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={imageUrl}
          onChange={handleInputChange}
          className={styles.input}
        />

        <label htmlFor="category" className={styles.label}>
          Category
        </label>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Age</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="category"
            name="category"
            value={category}
            label="Age"
            onChange={handleInputChange}
            className={styles.input}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Casio"}>Casio</MenuItem>
            <MenuItem value={"Apple watch"}>Apple watch</MenuItem>
            <MenuItem value={"Mi watch"}>Mi watch</MenuItem>
          </Select>
        </FormControl>

        <button type="submit" className={styles.button}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
