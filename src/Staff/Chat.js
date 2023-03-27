import { useEffect, useState,useRef } from "react";
function Chat({onClose}) {

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
const contentRef = useRef(null);
  console.log(ticketId);
  useEffect(() => {
    const interval = setInterval(() => {
    const fetchData = async () => {
      const resp = await fetch(
        `https://localhost7057/api/ticketchats/ticketId/${ticketId}`
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
console.log(ticketId)
useEffect(() => {
  const fetchData = async() => {
    const resp = await fetch(`https://localhost7057/api/tickets/${ticketId}`);
    console.log(resp);
    const newData = await resp.json();
    setGetTicket(newData); //save the list of newDate to the list
  }
  fetchData();
},[]);
useEffect(() => {
  if (sender === getTicket.StaffName) {
    setReceiver(getTicket.Username);
  } else {
    setReceiver(getTicket.StaffName);
  }
}, [getTicket, sender]);


  async function SendChat() {
   
    //wait for getticket to be updated
    if(getTicket.Id !== null){
      console.log("this is the ticketId " + getTicket.Id)
      let result = await fetch("https://localhost7057/api/ticketchats/", {
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
    <div className="chat">
   
    <div className="chat-messages" ref={contentRef}>
    <button className="close" onClick={onClose}>X</button>
      {Array.isArray(getChat)&&getChat.sort((a ,b) => b.Id - a.Id) && getChat.map((x) => (
        <div key={x.Id}>
          <h5>{x.Sender}  :  {x.Comment}</h5>    
        </div>
      ))}
      <div className="chat-sender">
      <input
        type="text"
        value={comment}
        className="form-control"
        placeholder="Message"
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={SendChat}>Send</button>
      </div>
    </div>

    </div>
  );
}

export default Chat;
