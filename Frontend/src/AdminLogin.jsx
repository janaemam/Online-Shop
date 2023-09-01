import React, { useState } from "react";
import axios from 'axios';
import './Login.css';

export const AdminLogin = (props) => {
  const [uname, setName] = useState('');
  const [password, setPassword] = useState('');
 
 const handleSubmit = (e) => {
  e.preventDefault();
  axios.post('http://localhost:8080/trial-1.0-SNAPSHOT/api/admin/login', {
    uname: uname,
    password: password,
  })
  .then(response => {
    if (JSON.stringify(response.data).includes('Login Successfully')) {
      alert('Login Successfully');
      const id = response.data.id;
      localStorage.setItem('id', id);
      console.log(id);
      props.onFormSwitch('adminHomepage');
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
      <h2>Admin Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="uname">name</label>
        <input value={uname} onChange={(e) => setName(e.target.value)} type="uname" placeholder="Enter name" id="uname" name="uname" />
        <label htmlFor="password">password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
        <button type="submit" className="button-login">Log In</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('homepage')}>Back to homepage</button>
    
    </div>
  );
};
