import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Chat from "./Chat";
// import Department from "./Department";

function Tickets() {
  const [ticketList, setTicketList] = useState([]); //get a list of all of the tickets
  const [ticketData, setTicketData] = useState({ StaffName: "" }); //get specific data
  const [showChat, setShowChat] = useState(false);

  let username = sessionStorage.getItem("username"); //username of staff

  useEffect(() => {
    const interval = setInterval(() => {
    const fetchData = async () => {
      const resp = await fetch(
        `https://localhost7057/api/tickets/staffname/${username}`
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
    // setBtnClicked(true);
    const updatedTicket = { ...ticketData, statusName: props };
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
  }

  async function GetChat(props)
  {
    sessionStorage.setItem("ticketId", props.Id);
    setShowChat(true)
  }
  return (
    <div className="application">
    <Navbar/>
    <div className="container">
      <h1>Tickets</h1>
   <div className="flex">
    <div>
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

          <button onClick={() => Work(x, "In-Progress")}>Work</button>
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
    </div>
    </div>
  );
}

export default Tickets;
