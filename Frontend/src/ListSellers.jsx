import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SellerHomePage.css";

export const ListSellers = (props) => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/trial-1.0-SNAPSHOT/api/admin/listseller`)
      .then(response => {
        setSellers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div class = "small-container product-page">
      <header>
        <nav class="navigation">
          <button class="btnAddProduct-popup"onClick={() => props.onFormSwitch('adminHomepage')}>HomePage</button>
        </nav>
      </header>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Password</th>
            
          </tr>
        </thead>
        <tbody>
          {sellers.map(seller => (
            <tr key={seller.id}>
              <td>{seller.id}</td>
              <td>{seller.name}</td>
              <td>{seller.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
