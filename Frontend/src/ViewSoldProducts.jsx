import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SellerHomePage.css";

export const ViewSoldProducts = (props) => {
  const [products, setProducts] = useState([]);
  const sellerid = localStorage.getItem('sellerid');

  useEffect(() => {
    axios.get(`http://localhost:8080/trial-1.0-SNAPSHOT/api/seller/sold/${sellerid}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
 
  return (
    <div className="small-container product-page">
      <header>
        <nav className="navigation">
          <button className="btnAddProduct-popup" onClick={() => props.onFormSwitch('sellerHomepage')}>Homepage</button>
        </nav>
      </header>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
            <th>Customer Address</th>
            <th>Shipping Company</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product["Product Name"]}</td>
              <td>{product.Price}</td>
              <td>{product.Description}</td>
              <td>{product["Customer Name"]}</td>
              <td>{product["Customer Email"]}</td>
              <td>{product["Customer Address"]}</td>
              <td>{product["Shipping Company"]}</td>
            </tr>
          ))}
          {Array.isArray(products) && products.length === 0 && (
            <tr>
              <td colSpan="7" style={{textAlign: 'center'}}>No products sold yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
