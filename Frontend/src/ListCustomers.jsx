import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SellerHomePage.css";

export const ListCustomers = (props) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/trial-1.0-SNAPSHOT/api/admin/listusers`)
      .then(response => {
        setCustomers(response.data);
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
            <th>Email</th>
            <th>Password</th>
            <th>Address</th>
            <th>Cart</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.password}</td>
              <td>{customer.address}</td>
              <td>{customer.cart}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
