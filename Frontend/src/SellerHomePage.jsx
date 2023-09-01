import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SellerHomePage.css";

export const SellerHomePage = (props) => {
  const [products, setProducts] = useState([]);
  const sellerid = localStorage.getItem('sellerid');

  useEffect(() => {
    axios.get(`http://localhost:8080/trial-1.0-SNAPSHOT/api/seller/products/${sellerid}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [sellerid]);
  const handleRemove = (productId) => {
    const sellerId = localStorage.getItem('sellerid');
  
    axios.post(`http://localhost:8080/trial-1.0-SNAPSHOT/api/seller/remove/${sellerId}/${productId}`)
    .then((response) => {
      console.log(response.data);
      setProducts(products.filter((product) => product.id !== productId));
    })
    .catch((error) => {
      console.error(error);
    });
  };
  
  

  

  return (
    <div class = "small-container product-page">
      <header>
        <nav class="navigation">
          <button class="btnAddProduct-popup"onClick={() => props.onFormSwitch('sellerAddProductpage')}>Add New Product</button>
          <button class="btnAddProduct-popup"onClick={() => props.onFormSwitch('viewsoldproductsPage')}>View</button>
        </nav>

      </header>
      
      <table>
        
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            
            <th>Remove</th>
          </tr>
          {products.map(product => (
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
        
      </table>
    </div>
  );
};
