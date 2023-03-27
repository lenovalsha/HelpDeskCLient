import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    sessionStorage.clear(); //clear our storage so we cant access the form after logging out
  });
  const notifyError =()=>{
    toast.error('Login failed', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  const notifySuccess =()=>{
    toast.success('Login Success', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  async function login() {
    const hashedPassword =await hashPassword(password);
    //queuering
    fetch(`https://localhost7057/api/${props.userLevel}/` + name)
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
            notifyError();
          }
        }
      })
      .catch((err) => {
        console.log("Login failed " + err.message);
        notifyError();
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
    <div>
    <Navbar/>

    <div className="container">
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
    <ToastContainer/>
    </div>
    </div>
  );
}
export default Login;
