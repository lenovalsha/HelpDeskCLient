import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
function Form() {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState();
  const [Title, setTitle] = useState();
  const [Description, setDescription] = useState();
  // const [statusList, setStatusList] = useState([]);
  // const [userList, setUserList] = useState([]);

  let username = sessionStorage.getItem("username");
  const dateString = "2023-03-15T23:59:07.348Z";
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString();

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
    <div>
      <Link to="/">Home</Link>
      <Link to="/login">Logout</Link>
      <h1>Form</h1>
      <input
        type="text"
        placeholder="Title"
        value={Title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        text={username}
        value={username}
      />

      <span>Category</span>
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
      <input
        value={Description}
        type="text"
        placeholder="Comment"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={GenerateTicket}>Submit</button>
    </div>
  );
}

export default Form;
