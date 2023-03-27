import { useState } from "react"

function Priorities(){
    const [priority,setPriority] = useState();
    const [Color,setColor] = useState();
    const colors = ['yellow','red','orange','green','blue','purple','pink',]



   async function MakePriority(){
        let result = await fetch("https://localhost7057/api/priorities/", {
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
        <div className="last-container">
        <input type="text" value={priority} onChange={(e) => setPriority(e.target.value) } placeholder="Name"/>
        <select onChange={(e)=> setColor(e.target.value) }>
        {
            colors.map(prio =>(
            <option value={prio} key={prio}>{prio}</option>   
            ))
        }
        </select>

        <button onClick={MakePriority}>Add Priority</button> 
        </div>
    </section>
    </div>)
}

export default Priorities;