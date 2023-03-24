import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Chat from "./Chat";
// import Department from "./Department";

function Tickets() {
  const [ticketList, setTicketList] = useState([]); //get a list of all of the tickets
  const [ticketData, setTicketData] = useState({ StaffName: "" }); //get specific data
  const [btnClicked, setBtnClicked] = useState(false);
  const [showChat, setShowChat] = useState(false);

  let username = sessionStorage.getItem("username"); //username of staff

  useEffect(() => {
    const interval = setInterval(() => {
    const fetchData = async () => {
      const resp = await fetch(
        `https://localhost:7057/api/tickets/staffname/${username}`
      );
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      const newData = await resp.json();
      setTicketList(newData); //save the list of newDate to the list
      console.log(newData);
    };
    fetchData();
  },3000);
  return()=> clearInterval(interval);
  }, []);

  // ===================================================================================
  async function Work(ticketData, props) {
    setBtnClicked(true);
    const updatedTicket = { ...ticketData, statusName: props };
    setTicketData(updatedTicket);

    const resp = await fetch(
      `https://localhost:7057/api/tickets/${ticketData.Id}`,
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
    // window.location.reload(true);
  }

  async function GetChat(props)
  {
    // setSelectedTicket(ticket);
    sessionStorage.setItem("ticketId", props.Id);
    setShowChat(true)
  }
  return (
    <div className="container">
    <Navbar/>
      <h1>Tickets</h1>
   
   <div className="flex">
    <div>

      <input className="columnName" type="text" value="User" readOnly />
      <input className="columnName" type="text" value="Assigned to" readOnly />
      <input className="columnName" type="text" value="Subject" readOnly />
      <input className="columnName" type="text" value="Comment" readOnly />
      <input className="columnName" type="text" value="Category" readOnly />
      <input className="columnName" type="text" value="Status" readOnly />
      {ticketList.map((x) => (
        <div>
          <input type="text" text={x.Name} value={x.Username} readOnly />
          <input
            type="text"
            value={x.StaffName === null ? "unassigned" : x.StaffName}
            readOnly
          />
          <input type="text" value={x.Title} readOnly />
          <input type="text" value={x.Content} readOnly />
          <input type="text" value={x.CategoryName} readOnly />
          <input type="text" value={x.StatusName} readOnly />

          <button disabled={btnClicked} onClick={() => Work(x, "In-Progress")}>Work</button>
          <button onClick={() => Work(x, "Completed")} disabled={false}>
            Complete
          </button>
          <button
            onClick={() =>
              GetChat(x)
            }
            disabled={false}
          >
            Chat
          </button>
        </div>
      ))}
      </div>
      </div>
      {showChat && (
        <Chat onClose={()=>{setShowChat(false)}}/>
      )}
      {/* =================================================================================== */}
    </div>
  );
}

export default Tickets;
