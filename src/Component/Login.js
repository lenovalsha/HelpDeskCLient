import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    sessionStorage.clear(); //clear our storage so we cant access the form after logging out
  });
  async function login() {
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
          
          if (resp.Password === password) {
            sessionStorage.setItem("username", name);
            if (props.userLevel === "admins") 
            {
              navigate("/adminDashboard");
            } else if (props.userLevel === "staffs") 
            {
              navigate("/staffpanel");
            } else if (props.userLevel === "users") {
              alert("user");
              navigate("/Form");
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

  return (
    <div className="App">
      <h1>{props.userLevel}</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={login}>Login</button>
    </div>
  );
}
export default Login;
