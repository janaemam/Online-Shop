import React, { useState , useEffect} from "react";
import axios from "axios";
import './Login.css';


export const SellerAddProductPage = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const [sellerid, setId] = useState("");

  useEffect(() => {
    // When you need to retrieve the selling_company_id
    const sellerid = localStorage.getItem('sellerid');
    setId(sellerid);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name:name,
      price:price,
      quantity : quantity,
      description:description
    };

    try {
      const response = await axios.post(`http://localhost:8080/trial-1.0-SNAPSHOT/api/seller/add/${sellerid}`, product);
      const updatedProducts = [...products, response.data];
      setProducts(updatedProducts);
      alert(response.data);
      props.onFormSwitch('sellerHomepage');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Add Products</h2>
      <form className="add-product" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Enter product name" id="name" name="name" />
        <label htmlFor="price">Price</label>
        <input value={price} onChange={(e) => setPrice(e.target.value)} type="price" placeholder="Enter price" id="price" name="price" />
        <label htmlFor="quantity">Quantity</label>
        <input value={quantity} onChange={(e) => setQuantity(e.target.value)} type="quantity" placeholder="Enter quantity" id="quantity" name="quantity" />
        <label htmlFor="description">Description</label>
        <input value={description} onChange={(e) => setDescription(e.target.value)} type="description" placeholder="Enter description" id="description" name="description" />
        <button type="submit" className="button-add">Add Product</button>
      </form>
    </div>
  );
};
