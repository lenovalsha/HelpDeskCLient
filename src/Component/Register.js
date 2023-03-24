import React, { useState } from "react";

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
    <div className="col-sm-2 offset-sm-5">
      <h1>Register {props.userLevel}</h1>
      <input
        type="text"
        value={username}
        className="form-control"
        placeholder="username"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        value={password}
        className="form-control"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <br />
      <button className="btn btn-primary" onClick={SignUp}>
        Register 
      </button>
    </div>
  );
}
export default Register;
