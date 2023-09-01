import React, { useState } from "react";
import axios from 'axios';
import './Login.css';

export const SellerLogin = (props) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
 
 const handleSubmit = (e) => {
  e.preventDefault();
  axios.post('http://localhost:8080/trial-1.0-SNAPSHOT/api/seller/login', {
    name: name,
    password: password,
  })
  .then(response => {
    if (JSON.stringify(response.data).includes('Login Successfully')) {
      alert('Login Successfully');
      const sellerid = response.data.sellerid;
      localStorage.setItem('sellerid', sellerid);
      console.log(sellerid);
      props.onFormSwitch('sellerHomepage');
    } else {
      alert('Login Failed');
    }
  })
  .catch(error => {
    console.error(error);
    alert('An error occurred while logging in');
  });
}


  return (
    <div className="auth-form-container">
      <h2>Seller Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="name">name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Enter name" id="name" name="name" />
        <label htmlFor="password">password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
        <button type="submit" className="button-login">Log In</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('homepage')}>Back to homepage</button>
    
    </div>
  );
};
