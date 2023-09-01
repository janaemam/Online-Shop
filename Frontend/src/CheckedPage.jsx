import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SellerHomePage.css";

export const CheckedPage = (props) => {
  const [orders, setOrders] = useState([]);
 
  const id = localStorage.getItem("id");

  useEffect (() => {
    axios
      .get(`http://localhost:8080/trial-1.0-SNAPSHOT/api/customer/orders/${id}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    });

  
  
  

  return (
    <div className="small-container product-page">
      

      <table>
        <thead>
          <tr>
            <th>Items</th>
            <th>Cost</th>
            <th>Status</th>
            
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.items}</td>
              <td>{order.cost}</td>
              <td>{order.status}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
