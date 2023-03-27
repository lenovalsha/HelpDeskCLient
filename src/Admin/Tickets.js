import { useState, useEffect } from "react";
import Department from "./Department";
import Navbar from "./Navbar";

function Tickets() {
  const [ticketList, setTicketList] = useState([]); //get a list of all of the tickets
  const [staffList, setStaffList] = useState([]);
  const [staff, setStaff] = useState();
  const [ticketData, setTicketData] = useState({ StaffName: "" }); //get specific data
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch("https://localhost7057/api/tickets/");
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      const newData = await resp.json();
      setTicketList(newData); //save the list of newDate to the list
      console.log(newData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch("https://localhost7057/api/staffs/");
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      const newData = await resp.json();
      setStaffList(newData); //save the list of newDate to the list
      console.log(newData);
    };
    fetchData();
  }, []);

  async function assignStaff(ticketData) {
    const updatedTicket = { ...ticketData, StaffName: staff };
    setTicketData(updatedTicket);
    const resp = await fetch(
      `https://localhost7057/api/tickets/${ticketData.Id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTicket),
      }
    );
    try {
      const newData = await resp.json();
      setTicketData(newData);
      console.log(newData);
    } catch (error) {
      console.error(error);
    }
    window.location.reload(true);
  }

  return (
    <div className="application">
      <Navbar />
      <div className="container">
        <h1 className="title">Tickets</h1>

        <div className="flex">
          <div>
            <input className="columnName" type="text" value="User" readOnly />
            <input
              className="columnName"
              type="text"
              value="Assigned to"
              readOnly
            />
            <input
              className="columnName"
              type="text"
              value="Subject"
              readOnly
            />
            <input
              className="columnName"
              type="text"
              value="Comment"
              readOnly
            />
            <input className="columnName" type="text" value="Status" readOnly />
            <input
              className="columnName"
              type="text"
              value="Category"
              readOnly
            />
            <input className="columnName" type="text" value="Assign" readOnly />

            {ticketList.map((x) => (
              <div className="values">
                <input type="text" text={x.Name} value={x.Username} readOnly />
                <input
                  type="text"
                  value={x.StaffName === null ? "unassigned" : x.StaffName}
                  readOnly
                />
                <input type="text" value={x.Title} readOnly />
                <input type="text" value={x.Content} readOnly />
                <input type="text" value={x.StatusName} readOnly />
                <input type="text" value={x.CategoryName} readOnly />

                <select onChange={(e) => setStaff(e.target.value)}>
                  {staffList.map((prio) => (
                    <option value={prio.Id} key={prio.Id}>
                      {prio.Name}
                    </option>
                  ))}
                </select>
                <button onClick={() => assignStaff(x)}>Change</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tickets;
