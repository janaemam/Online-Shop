import React, { useState } from "react";
import './HomePage.css'

export const AdminHomePage = (props) =>{

  return (
    <body>
      
       <button class = "btnAdmin-popup"onClick={() => props.onFormSwitch('listCustomerPage')}>List Customers</button>
            <button class = "btnAdmin-popup"onClick={() => props.onFormSwitch('listShipperPage')}>List Shippers</button>
            <button class = "btnAdmin-popup"onClick={() => props.onFormSwitch('listSellerPage')}>List Sellers</button>
            <button class = "btnAdmin-popup"onClick={() => props.onFormSwitch('createSellerPage')}>Create Seller</button>
            <button class = "btnAdmin-popup"onClick={() => props.onFormSwitch('createShipperPage')}>Create Shipper</button>
    </body>
  );
}
