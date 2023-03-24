import { useState } from "react"

function Status(){
    const [status,setStatus] = useState('');
    const [Color,setColor] = useState('');

   async function MakePriority(){
        let result = await fetch("https://localhost:7057/api/status/", {
      method: "POST",
      body: JSON.stringify({
        name: status,
        color:Color
      }),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    result = await result.json();
    
    alert("Priority added!")
    window.location.reload(true);
    }
    return(
    <div>
        <h1>Status</h1>
        <input type="text" value={status} onChange={(e) => setStatus(e.target.value) } placeholder="Name"/>
        <input type="text" value={Color} onChange={(e) => setColor(e.target.value) } placeholder="Color"/>
        <button onClick={MakePriority}>Add Status</button> 
    </div>)
}

export default Status;