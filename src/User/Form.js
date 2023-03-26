import { useEffect, useState } from "react";
import Navbar from "./Navbar";

import { Link, useNavigate } from "react-router-dom";
function Form() {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState();
  const [Title, setTitle] = useState();
  const [Description, setDescription] = useState();
  let username = sessionStorage.getItem("username");

  useEffect(() => {
    //get the priority list data
    const fetchData = async () => {
      const resp = await fetch("https://localhost:7057/api/Categories/");
      const newData = await resp.json();
      setCategoryList(newData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (username === "" || username === null) {
      navigate("/login");
    }
  }, []);

  async function GenerateTicket() {
    let result = await fetch("https://localhost:7057/api/tickets/", {
      method: "POST",
      body: JSON.stringify({
        title: Title,
        content: Description,
        statusName: "Pending",
        username: username,
        categoryName: category,
        staffName: null
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
  }

  return (
    <div className="application">
    <div className="container">
    <Navbar/>
      <div className="requestForm">
      <h1> Request Form</h1>
      <div>
      <label>Title</label>
      <input
        type="text"
        placeholder="Title"
        value={Title}
        onChange={(e) => setTitle(e.target.value)}
      />

      </div>
      <div>
      <label>Username</label>
      <input
        type="text"
        placeholder="Username"
        text={username}
        value={username}
      />

      </div>
      <div>

      <label>Category</label>

      <select onChange={(e) => setCategory(e.target.value)}>
        {
          //loop through the list and add it as option
          categoryList.map((prio) => (
            <option value={prio.Name} key={prio.Name}>
              {prio.Name}
            </option>
          ))
        }
      </select>
      </div>
      <div>
      <textarea rows="4" cols="80"
        value={Description}
        type="text"
        placeholder="Comment"
        onChange={(e) => setDescription(e.target.value)}
      />
      </div>
      <button onClick={GenerateTicket}>Submit</button>
      </div>
    </div>
    </div>
  );
}

export default Form;
