import React, { useState } from "react";
import Navbar from "./Navbar";


function Register(props) {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const date = new Date("2023-03-15T23:59:07.348Z");
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  const formattedDate = date.toLocaleString("en-US", options);
  async function SignUp() {
    const passwordHash = await hashPassword(password);

    let result = await fetch(`https://localhost:7057/api/${props.userLevel}/`, {
      method: "POST",
      body: JSON.stringify({
        name: username,
        password: passwordHash      
      }),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    result = await result.json();

  }
  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return hexString(hash);
  }
  
  function hexString(buffer) {
    const byteArray = new Uint8Array(buffer);
    const hexCodes = [...byteArray].map(value => {
      const hexCode = value.toString(16);
      const paddedHexCode = hexCode.padStart(2, '0');
      return paddedHexCode;
    });
    return hexCodes.join('');
  }
  return (
    <div className="container">
      <Navbar/>
      <div className="form">
      <h1>REGISTER {props.userLevel.toUpperCase()}</h1>
      <div>
      <label>Username:</label>
      <input
        type="text"
        value={username}
        className="form-control"
        placeholder="Username"
        onChange={(e) => setName(e.target.value)}
      />
      </div>
      <div>
      <label>Password:</label>

      <input
        type="password"
        value={password}
        className="form-control"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      </div>
      
      <br />
      <button className="btn btn-primary" onClick={SignUp}>
        Register 
      </button>
      </div>
    </div>
  );
}
export default Register;
