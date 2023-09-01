import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

export const CreateShipper = (props) => {
  const [name, setName] = useState('');
  const [area, setArea] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      const createResponse = await axios.post('http://localhost:8080/trial-1.0-SNAPSHOT/api/admin/createshipper', {
        name,
        area
      });
      console.log(createResponse.data);
      if (createResponse.status === 200) {
        alert('Shipping Company created successfully!\n' + createResponse.data);
      } else {
        alert('Failed to create Shipping Company!');
      }
    
  };

  return (
    <div className="auth-form-container">
      <h2>Create Shipper</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
        <label htmlFor="area">Area</label>
        <input value={area} name="area" onChange={(e) => setArea(e.target.value)} id="Area" placeholder="Area" />
        <button type="submit" className="button-login">Create</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('adminHomepage')}>Go back HomePage</button>
    </div>
  );
};
