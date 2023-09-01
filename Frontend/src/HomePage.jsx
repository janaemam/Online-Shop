import React, { useState } from "react";
import './HomePage.css'

export const HomePage = (props) =>{

  return (
    <body>
      <header>
        <h2 class="logo">ShoppingWeb</h2>
       
       </header>
       <button class = "btnLogin-popup"onClick={() => props.onFormSwitch('customerLogin')}>Customer</button>
            <button class = "btnLogin-popup"onClick={() => props.onFormSwitch('checkshipperpasswordPage')}>Shipper</button>
            <button class = "btnLogin-popup"onClick={() => props.onFormSwitch('checksellerpasswordPage')}>Seller</button>
            <button class = "btnLogin-popup"onClick={() => props.onFormSwitch('adminLogin')}>Admin</button>
    </body>
  );
}
