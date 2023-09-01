import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

export const CheckShipperPassword = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.get(`http://localhost:8080/trial-1.0-SNAPSHOT/api/shipping/checkpassword/${name}`);


      
      setPassword(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Check password</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="name">name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="name"
          placeholder="Enter name"
          id="name"
          name="name"
          required
        />

        <button type="submit" className="button-login">
          CheckPassword
        </button>
      </form>
      {password && (
        <div className="password-container">
          <p>Your password is:</p>
          <p>{password}</p>
        </div>
      )}
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch("shipperLogin")}
      >
        Login
      </button>
    </div>
  );
};
