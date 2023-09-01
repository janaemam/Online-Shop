import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SellerHomePage.css";

export const ListShippers = (props) => {
  const [shippers, setShippers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/trial-1.0-SNAPSHOT/api/admin/listshipper`)
      .then(response => {
        setShippers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div class = "small-container product-page">
      <header>
        <nav class="navigation">
          <button class="btnAddProduct-popup" onClick={() => props.onFormSwitch('adminHomepage')}>HomePage</button>
        </nav>
      </header>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Password</th>
            <th>Area</th>            
          </tr>
        </thead>
        <tbody>
          {shippers.map(shipper => (
            <tr key={shipper.id}>
              <td>{shipper.id}</td>
              <td>{shipper.name}</td>
              <td>{shipper.password}</td>
              <td>{shipper.area}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
