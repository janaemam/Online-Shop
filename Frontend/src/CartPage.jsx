import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SellerHomePage.css";

export const CartPage = (props) => {
  const [products, setProducts] = useState([]);
  const id = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/trial-1.0-SNAPSHOT/api/customer/cart/${id}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleRemove = (productId) => {
    axios
      .post(`http://localhost:8080/trial-1.0-SNAPSHOT/api/customer/remove/${productId},${id}`)
      .then((response) => {
        console.log(response.data);
        setProducts(products.filter((product) => product.id !== productId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div class="small-container product-page">
      <header>
        <nav class="navigation">
          <button
            class="btnAddProduct-popup"
            onClick={() => props.onFormSwitch("checkoutPage")}
          >
            Checkout
          </button>
          <button
            class="btnAddProduct-popup"
            onClick={() => props.onFormSwitch("cHomepage")}
          >
            Homepage
          </button>
          
        </nav>
      </header>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              
              <td>
                <button onClick={() => handleRemove(product.id)}>
                  Remove item
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
