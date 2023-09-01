import React, { useState } from "react";
import "./Login.css";
export const CreateSeller = (props) => {
    

    const [name, setName] = useState('');
    

  

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
        const response = await fetch('http://localhost:8080/trial-1.0-SNAPSHOT/api/admin/createseller', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            
          }, getCircularReplacer())
        });
        const data = await response.json();
        console.log(data);
        alert('Seller added successfully!');
      };
      

    return (
        <div className="auth-form-container">
            <h2>Create Seller</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
            
            <button type="submit" className="button-login">Create</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('adminHomepage')}>Go back HomePage</button>
    </div>
    )
}
