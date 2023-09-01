import React, { useState } from "react";
import axios from 'axios';
import './Login.css';


export const CustomerLogin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/trial-1.0-SNAPSHOT/api/customer/login', {
      email: email,
      password: password,
    })
    .then(response => {
      if (JSON.stringify(response.data).includes('Login Successfully')) {
        alert('Login Successfully');
        const id = response.data.id;
        localStorage.setItem('id', id);
        console.log(id);
        props.onFormSwitch('cHomepage');
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
      <h1>Customer Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        <label htmlFor="password">password</label>
        <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
        <button type="submit" className="button-login" >Log In</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
      <button className="link-btn" onClick={() => props.onFormSwitch('homepage')}>Back to homepage</button>
    </div>
  );
};
