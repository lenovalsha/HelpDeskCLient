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
    let result = await fetch(`https://localhost:7057/api/${props.userLevel}/`, {
      method: "POST",
      body: JSON.stringify({
        name: username,
        password: password      
      }),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    result = await result.json();

  }
  return (
    <div className="App">
      <Navbar/>
      <div className="form">
      <h1>Register {props.userLevel}</h1>
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
