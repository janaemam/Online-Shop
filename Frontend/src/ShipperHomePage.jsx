import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SellerHomePage.css";

export const ShipperHomePage = (props) => {
  const [orders, setOrders] = useState([]);
  const shipperId = localStorage.getItem('id');

  useEffect(() => {
    axios.get(`http://localhost:8080/trial-1.0-SNAPSHOT/api/shipping/list/${shipperId}`)
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [shipperId]);

  const handleUpdate = (orderId) => {
    const shipperId = localStorage.getItem('id');
  
    axios.post(`http://localhost:8080/trial-1.0-SNAPSHOT/api/shipping/update/${shipperId},${orderId}`)
      .then((response) => {
        console.log(response.data);
        setOrders(orders.map((order) => {
          if (order.id === orderId) {
            order.status = "Delivered";
          }
          return order;
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div class="small-container product-page">
      

      <table>
        <tr>
          <th>Order ID</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        {orders.map(order => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.status}</td>
            <td>
              {order.status === "Shipping in Progress" &&
                <button onClick={() => handleUpdate(order.id)}>
                  Update to Delivered
                </button>
              }
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
