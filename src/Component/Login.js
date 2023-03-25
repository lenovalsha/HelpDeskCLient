import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Login(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    sessionStorage.clear(); //clear our storage so we cant access the form after logging out
  });
  async function login() {
    const hashedPassword =await hashPassword(password);
    //queuering
    fetch(`https://localhost:7057/api/${props.userLevel}/` + name)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        //if user isnt found
        if (Object.keys(resp).length === 0) {
          console.log("Login Failed " + name);
        } //we found a data that has the user name
        else {
          //now see if password matches
          if (resp.Password === hashedPassword) {
            sessionStorage.setItem("username", name);
            if (props.userLevel === "admins") 
            {
              navigate("/adminDashboard");
            } else if (props.userLevel === "staffs") 
            {
              navigate("/staffpanel");
            } else if (props.userLevel === "users") {
              alert("user");
              navigate("/form");
            }
          } else {
            console.log("Login Failed");
          }
        }
      })
      .catch((err) => {
        console.log("Login failed " + err.message);
      });
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
      <h1>{props.userLevel.toUpperCase()}</h1>
      <div>
        <label>Username:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Username"
      />
      </div>
      <div>
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      </div>
      <button onClick={login}>Login</button>
    </div>
    </div>
  );
}
export default Login;
