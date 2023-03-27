import React, { useState } from "react";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register(props) {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const notify = () => toast("You are now registered");
  async function SignUp() {
    notify();
    const passwordHash = await hashPassword(password);

    let result = await fetch(`https://localhost7057/api/${props.userLevel}/`, {
      method: "POST",
      body: JSON.stringify({
        name: username,
        password: passwordHash,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
  }
  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return hexString(hash);
  }

  function hexString(buffer) {
    const byteArray = new Uint8Array(buffer);
    const hexCodes = [...byteArray].map((value) => {
      const hexCode = value.toString(16);
      const paddedHexCode = hexCode.padStart(2, "0");
      return paddedHexCode;
    });
    return hexCodes.join("");
  }
  return (
    <div>
      <Navbar />
      <div className="container">
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
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
export default Register;
