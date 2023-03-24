import { useState } from "react"

function Priorities(){
    const [priority,setPriority] = useState();
    const [Color,setColor] = useState();


   async function MakePriority(){
        let result = await fetch("https://localhost:7057/api/priorities/", {
      method: "POST",
      body: JSON.stringify({
        name: priority,
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
    <section>
        <h1>Priority</h1>
        <input type="text" value={priority} onChange={(e) => setPriority(e.target.value) } placeholder="Name"/>
        <input type="text" value={Color} onChange={(e) => setColor(e.target.value) } placeholder="Color"/>

        <button onClick={MakePriority}>Add Priority</button> 
    </section>
    </div>)
}

export default Priorities;