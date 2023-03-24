import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Department from "./Department";

function Tickets() {
  const [ticketList, setTicketList] = useState([]); //get a list of all of the tickets
  const [ticket, setTicket] = useState();
  const [staffList, setStaffList] = useState([]);
  const [staff, setStaff] = useState();
  const [ticketData, setTicketData] = useState({ StaffName: "" }); //get specific data
  const [disableButton, setDisableButton] = useState(true);
  const [ticketId, setTicketId] = useState();

  let username = sessionStorage.getItem("username"); //username of staff
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch("https://localhost:7057/api/staffs/");
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      const newData = await resp.json();
      setStaffList(newData); //save the list of newDate to the list
      console.log(newData);
    };
    fetchData();
  }, []);

  // ===================================================================================
  async function Work(ticketData, props) {
    setDisableButton(false);
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
    window.location.reload(true);
  }
  // ===================================================================================
  async function GetChat(props) {

 
    sessionStorage.setItem("ticketId", props.Id);
    navigate({
      pathname: "/chat",
      state: { Id:props.Id },
    });
  // ====================================================================================
  }
  return (
    <div>
      <h1>{username}</h1>
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
          <input
            type="text"
            value={
              x.StatusName === "Pending"
                ? "white"
                : "In Progress"
                ? "yellow"
                : "Closed"
                ? "green"
                : "red"
            } //color here
            readOnly
          />
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

      {/* =================================================================================== */}
    </div>
  );
}

export default Tickets;
