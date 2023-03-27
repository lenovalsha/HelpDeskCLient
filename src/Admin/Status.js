import { useState } from "react"

function Status(){
    const [status,setStatus] = useState('');
    const [Color,setColor] = useState('');
    const colors = ['yellow','red','orange','green','blue','purple','pink',]

   async function MakePriority(){
        let result = await fetch("https://localhost7057/api/status/", {
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
      <section>
        <h1>Status</h1>
        <div className="last-container">
        <input type="text" value={status} onChange={(e) => setStatus(e.target.value) } placeholder="Name"/>
        <select onChange={(e)=> setColor(e.target.value) }>
        {
            //loop through the list and add it as option
            colors.map(prio =>(
            <option value={prio} key={prio}>{prio}</option>   
            ))
        }
        </select>
        <button onClick={MakePriority}>Add Status</button> 
        </div>
      </section>
    </div>)
}

export default Status;