import React, { useState } from "react";
import "./Login.css";
export const CustomerRegister = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    /*const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }*/

    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
          if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
              return;
            }
            seen.add(value);
          }
          return value;
        };
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/trial-1.0-SNAPSHOT/api/customer/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            address,
            password
          }, getCircularReplacer())
        });
        const data = await response.json();
        console.log(data);
      };
      

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="address">Address</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)}type="address" placeholder="Enter address" id="address" name="address" />
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit" className="button-login">Register</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('customerLogin')}>Already have an account? Login here.</button>
    </div>
    )
}