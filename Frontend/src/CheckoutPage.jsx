import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./SellerHomePage.css";

export const CheckoutPage = (props) => {
const [products, setProducts] = useState([]);
const [totalCost, setTotalCost] = useState(0);
const [orderStatus, setOrderStatus] = useState("");
const [shippingCompanies, setShippingCompanies] = useState([]);
const [selectedCompanyId, setSelectedCompanyId] = useState(0);
const [errorMessage, setErrorMessage] = useState('');
const id = localStorage.getItem("id");

useEffect(() => {
axios.get(`http://localhost:8080/trial-1.0-SNAPSHOT/api/customer/cart/${id}`)
.then((response) => {
setProducts(response.data);
setTotalCost(
response.data.reduce((total, product) => total + product.price, 0)
);
})
.catch((error) => {
console.error(error);
});

axios.get(`http://localhost:8080/trial-1.0-SNAPSHOT/api/customer/companies`)
.then((response) => {
  setShippingCompanies(response.data);
})
.catch((error) => {
  console.error(error);
});
}, []);

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const id = localStorage.getItem("id");
    const orderResponse = await axios.post(
      `http://localhost:8080/trial-1.0-SNAPSHOT/api/customer/place/${id}`
    );
    const orderData = orderResponse.data;
    if (orderData === "Order Placed Successfully") {
      const shippingResponse = await axios.post(
        `http://localhost:8080/trial-1.0-SNAPSHOT/api/customer/shipping/${selectedCompanyId}/${id}`
      );
      const shippingData = shippingResponse.data;
      if (shippingData === "Shipping Company Set") {
        alert("Order Placed Successfully");
        console.log(orderData);
      } else {
        setErrorMessage(shippingData);
        alert(shippingData);
      }
    } else {
      setErrorMessage(orderData);
      alert(orderData);
    }
  } catch (error) {
    console.error(error); // handle error
  }
};


const handleShippingCompanyChange = (event) => {
setSelectedCompanyId(event.target.value);
setErrorMessage('');
};

return (
<div className="small-container product-page">
{errorMessage && <div className="error-message">{errorMessage}</div>}
<header>
<nav className="navigation">
<button
className="btnAddProduct-popup"
onClick={() => props.onFormSwitch("cartpage")}
>
Cart
</button>
<button className="btnAddProduct-popup" onClick={handleSubmit}>
Place Order
</button>
<button className="btnAddProduct-popup" onClick={() => props.onFormSwitch("checkedPage")}>
        View orders
      </button>
    </nav>
  </header>

  <table>
    <thead>
      <tr>
        <th>Total Cost</th>
        <th>Select shipping company</th>
      </tr>
    </thead>
    <tbody>
      {products.length > 0 && (
        <>
          <tr>
            <td>${totalCost.toFixed(2)}</td>
            <td>
              <select
                value={selectedCompanyId}
                onChange={handleShippingCompanyChange}
              >
                <option value={0}>--Select a shipping company--</option>
                {shippingCompanies.map((company) => (
                  <option value={company.id} key={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
                </td>
              </tr>
              
            </>
          )}
          {orderStatus && (
            <tr>
              <td colSpan="2">{orderStatus}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
