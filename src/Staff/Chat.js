import { useEffect, useState } from "react";
function Chat(props) {

  // this is for chat history
  const [getChat, setGetChat] = useState([]);
  const [getTicket, setGetTicket] = useState({
    Id: null,
    StaffName: '',
    Username: ''
  });
  const [chatMessages,setChatMessages] = useState([]);
  const [comment, setComment] = useState("");
  const [receiver, setReceiver] = useState('');
  let sender = sessionStorage.getItem("username");
  let ticketId = sessionStorage.getItem("ticketId");

  console.log(ticketId);
  useEffect(() => {
    const interval = setInterval(() => {
    //get the ticket list data
    const fetchData = async () => {
      const resp = await fetch(
        `https://localhost:7057/api/ticketchats/?ticketId/${ticketId}`
      );
    console.log(resp);

      const newData = await resp.json();
      setGetChat(newData);
      setChatMessages(newData.Comment) //save the list of newDate to the list
    };
    fetchData();
  },3000);
  return()=> clearInterval(interval);
}, []);
useEffect(() => {
  const fetchData = async() => {
    const resp = await fetch(`https://localhost:7057/api/tickets/${ticketId}`);
    console.log(resp);
    const newData = await resp.json();
    setGetTicket(newData); //save the list of newDate to the list
  }
  fetchData();
},[]);

  async function SendChat() {
    if (sender === getTicket.StaffName) {
      console.log(getTicket.StaffName);
      setReceiver(getTicket.Username);
    } else {
      setReceiver(getTicket.StaffName);
      console.log(getTicket.StaffName + "this is if the sender != staffname" + sender);
    }
    //wait for getticket to be updated
    if(getTicket.Id !== null){
      console.log("this is the ticketId " + getTicket.Id)
      let result = await fetch("https://localhost:7057/api/ticketchats/", {
        method: "POST",
        body: JSON.stringify({
          TicketId: getTicket.Id,
          Comment: comment,
          Sender: sender,
          Receiver:receiver,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      result = await result.json();

      const newMessage = {
        Id: result.Id,
        TicketId: result.TicketId,
        Comment: result.Comment,
        Sender: result.Sender,
        Receiver: result.Receiver,
      };
      setGetChat([...getChat, newMessage]);
      setChatMessages([...chatMessages, newMessage.Comment]);
      setComment("");
    }
    
  }
  return (
    <div>
      <h1>CHAT</h1>
      <p>{props.Username === null ? "empty" : props.Username}</p>
      <p>{props.comment}</p>
      {Array.isArray(getChat) && getChat.map((x) => (
        <div key={x.Id}>
          <span>{x.Sender}</span>
          <span>{x.Comment}</span>
        </div>
      ))}
      <p>{getTicket.Id}</p>
      <input
        type="text"
        value={comment}
        className="form-control"
        placeholder="Chat"
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={SendChat}>Send</button>
    </div>
  );
}

export default Chat;