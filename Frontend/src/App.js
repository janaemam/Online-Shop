import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
//import './App.css';
//import './Login.css';
import {  SellerLogin } from "./SellerLogin";
import { CustomerRegister } from "./CustomerRegister";
import { CustomerLogin} from "./CustomerLogin";
import {CustomerHomePage} from "./CustomerHomePage";
import { SellerHomePage } from "./SellerHomePage";
import { ShipperHomePage } from "./ShipperHomePage";
import { ShipperLogin } from "./ShipperLogin";
import { HomePage } from "./HomePage";
import { AdminLogin } from "./AdminLogin";
import { AdminHomePage } from "./AdminHomePage";
import { SellerAddProductPage } from "./SellerAddProductPage";
import { CartPage } from "./CartPage";
import{CheckoutPage} from "./CheckoutPage";
import{CheckedPage} from "./CheckedPage";
import{ListCustomers} from "./ListCustomers";
import{ListShippers} from "./ListShippers";
import{ListSellers} from "./ListSellers";
import{CreateSeller} from "./CreateSeller";
import{CreateShipper} from "./CreateShipper";
import{CheckShipperPassword} from "./CheckShipperPassword";
import{CheckSellerPassword} from "./CheckSellerPassword";
import{ViewSoldProducts} from "./ViewSoldProducts";

function App() {
  const [currentForm, setCurrentForm] = useState('homepage');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    
    <div className="App">
          {currentForm === "sellerLogin" ? (<SellerLogin onFormSwitch={toggleForm} />)
          :currentForm === "sellerHomepage" ? (<SellerHomePage onFormSwitch={toggleForm} />)
          :currentForm === "sellerAddProductpage" ? (<SellerAddProductPage onFormSwitch={toggleForm} />)
           :currentForm === "customerLogin" ? (<CustomerLogin onFormSwitch={toggleForm} />)
          :currentForm === "register" ? (<CustomerRegister onFormSwitch={toggleForm} />)
          :currentForm === "cHomepage" ? (<CustomerHomePage onFormSwitch={toggleForm} />)
          :currentForm === "shipperLogin" ? (<ShipperLogin onFormSwitch={toggleForm} />)
          :currentForm === "shipperHomepage" ? (<ShipperHomePage onFormSwitch={toggleForm} />)
          :currentForm === "homepage" ? (<HomePage onFormSwitch={toggleForm} />)
          :currentForm === "adminLogin" ? (<AdminLogin onFormSwitch={toggleForm} />)
          :currentForm === "adminHomepage" ? (<AdminHomePage onFormSwitch={toggleForm} />)
          :currentForm === "cartpage" ? (<CartPage onFormSwitch={toggleForm} />)
          :currentForm === "checkoutPage" ? (<CheckoutPage onFormSwitch={toggleForm} />)
          :currentForm === "checkedPage" ? (<CheckedPage onFormSwitch={toggleForm} />)
          :currentForm === "listCustomerPage" ? (<ListCustomers onFormSwitch={toggleForm} />)
          :currentForm === "listShipperPage" ? (<ListShippers onFormSwitch={toggleForm} />)
          :currentForm === "listSellerPage" ? (<ListSellers onFormSwitch={toggleForm} />)
          :currentForm === "createSellerPage" ? (<CreateSeller onFormSwitch={toggleForm} />)
          :currentForm === "createShipperPage" ? (<CreateShipper onFormSwitch={toggleForm} />)
          :currentForm === "checkshipperpasswordPage" ? (<CheckShipperPassword onFormSwitch={toggleForm} />)
          :currentForm === "checksellerpasswordPage" ? (<CheckSellerPassword onFormSwitch={toggleForm} />)
          :currentForm === "viewsoldproductsPage" ? (<ViewSoldProducts onFormSwitch={toggleForm} />)
          
        
          :(<CustomerHomePage onFormSwitch={toggleForm} /> )
        }
      </div>

  );
}

export default App;