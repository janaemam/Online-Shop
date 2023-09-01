import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SellerHomePage.css";

export const CustomerHomePage = (props) => {
  const [products, setProducts] = useState([]);

useEffect(() => {
  axios.get('http://localhost:8080/trial-1.0-SNAPSHOT/api/customer/products')
    .then(response => {
      setProducts(response.data);
    })
    .catch(error => {
      console.error(error);
      alert('An error occurred while fetching Products');
    });
}, []);

const handlePurchase = (product) => {
  const customerId = localStorage.getItem('id');
  axios.post(`http://localhost:8080/trial-1.0-SNAPSHOT/api/customer/add/${product.id},${customerId}`, {
    customer_id: customerId,
    product_id: product.id
  })
    .then(response => {
      alert('Added to cart successfully!');
    })
    .catch(error => {
      console.error(error);
      alert('An error occurred while purchasing the product');
    });
};
  return (
    <div class="small-container product-page">
      <header>
        <nav class="navigation">
          <button
            class="btnAddProduct-popup"
            onClick={() => props.onFormSwitch("cartpage")}
          >
            Check Cart
          </button>
        </nav>
      </header>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            
            <th>Add to cart</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              
              <td>
                <button onClick={() => handlePurchase(product)}>Add to cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
