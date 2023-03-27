import { useState,useEffect } from "react";
import Department from "./Department";
import Navbar from "./Navbar";

function Staff() {
  const [staffList, setStaffList] = useState([]); //get staff list
  const [staffData,setStaffData] = useState({department:''}) //get specific data
  const [departmentList,setDepartmentList] = useState([]); //get department list
  const [department,setDepartment] = useState([]) //get specific department set


  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch("https://localhost7057/api/staffs/");
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      const newData = await resp.json();
      setStaffList(newData); //save the list of newDate to the list
      console.log(newData);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch("https://localhost7057/api/departments/");
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      const newData = await resp.json();
      setDepartmentList(newData); //save the list of newDate to the list
      console.log(newData);
    };
    fetchData();
}, []);

async function changeDepartment(staffData){
        const updatedStaff = { ...staffData, departmentName: department};
        setStaffData(updatedStaff);
        const resp = await fetch(
            `https://localhost7057/api/staffs/${staffData.Name}`,
            {
              method: "PUT",
              
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedStaff),
            }
          );
          try {
            const newData = await resp.json();
            setStaffData(newData);
            console.log(newData);
          } catch (error) {
            console.error(error);
          }
        window.location.reload(true);
          
        }          
  return (
    <div className="application"> 
    
    <Navbar/>
    <div className="container">
    <div className="flex">
      <div>
    <h1>Staff List</h1>
      {staffList.map((x) => (<div>
        <input
          type="text"
          text={x.Name}
          value={x.Name}
          readOnly/>
        <input
          type="text"
          value={x.DepartmentName}
          readOnly/>
        <select onChange={(e)=> setDepartment(e.target.value) }>
        {
            //loop through the list and add it as option
            departmentList.map(prio =>(
            <option value={prio.Name} key={prio.Name}>{prio.Name}</option>   
            ))
        }
        </select>
        <button onClick={()=>changeDepartment(x)}>Change</button>
        </div>
      ))}
      </div>
    </div>
    </div>
    </div>
  );
}

export default Staff;