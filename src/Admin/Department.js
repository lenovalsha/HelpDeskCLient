import { useState } from "react"

function Department(){
    const [Department,setDepartment] = useState('');
   async function MakeDepartment(){
        let result = await fetch("https://localhost:7057/api/Departments/", {
      method: "POST",
      body: JSON.stringify({
        name: Department
      }),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    result = await result.json();
    
    alert("Department added!")
    window.location.reload(true);
    }
    return(
    <div>
    <section>

        <h1>Department</h1>
        <div className="last-container">
        <input type="text" value={Department} onChange={(e) => setDepartment(e.target.value) } placeholder="Name"/>
        <button onClick={MakeDepartment}>Add Department</button> 
        </div>
    </section>
    </div>)
}

export default Department;