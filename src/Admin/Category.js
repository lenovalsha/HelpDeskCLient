import { useEffect, useState } from "react";

function Category(){
    const [priorityList, setPriorityList] = useState([]); //get a list of priority
    const [priorityname,setPriority] = useState('');
    const [category,setCategory] = useState('');
   

    useEffect(() => {
        //get the priority list data
        const fetchData = async()=> {
            const resp = await fetch('https://localhost:7057/api/priorities/');
            const newData = await resp.json();
            setPriorityList(newData); //save the list of newDate to the list
            console.log(newData);
        }
        fetchData();
    },[]);

    async function AddCategory(){
        const selectedPriority =  priorityList.find(p => p.Name === priorityname);
        
        if (!selectedPriority) {
            console.error(`Priority with name ${priorityname} not found.`);
            return;
        }
        let result = await fetch("https://localhost:7057/api/categories/", {
            method: "POST",
            body: JSON.stringify({
                name: category,
                priorityName: selectedPriority.Name,
               
            }),
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
          });
          result = await result.json();
    }
    return(<div>
    <section>

    <h1>Category</h1>
        <input value={category} onChange={(e) => setCategory(e.target.value)} />
        

        <div>
        <select onChange={(e)=> setPriority(e.target.value) }>
        {
            //loop through the list and add it as option
            priorityList.map(prio =>(
            <option value={prio.Name} key={prio.Name}>{prio.Name}</option>   
            ))
        }
        </select>
        <button onClick={AddCategory}>Add Category</button>

        </div>
    </section>
    </div>)
}
export default Category;