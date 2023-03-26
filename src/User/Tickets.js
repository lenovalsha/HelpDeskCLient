import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Chat from "../Staff/Chat";
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
        `https://localhost:7057/api/tickets/username/${username}`
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
    <div className="application">
    <div className="container">
    <Navbar/>
      <h1>Tickets</h1>
   
   <div className="flex">
    <div>

      <input className="columnName" type="text" value="Subject" readOnly />
      <input className="columnName" type="text" value="Comment" readOnly />
      <input className="columnName" type="text" value="Category" readOnly />
      <input className="columnName" type="text" value="Status" readOnly />
      <input className="columnName" type="text" value="Assigned to" readOnly />
      {ticketList.map((x) => (
        <div>
          <input type="text" value={x.Title} readOnly />
          <input type="text" value={x.Content} readOnly />
          <input type="text" value={x.CategoryName} readOnly />
          <input type="text" value={x.StatusName} readOnly />
          <input
            type="text"
            value={x.StaffName === null ? "unassigned" : x.StaffName}
            readOnly
          />
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
    </div>
  );
}

export default Tickets;
