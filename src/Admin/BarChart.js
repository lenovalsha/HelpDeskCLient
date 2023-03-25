import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


import React, { PureComponent, useEffect, useState } from "react";
function BChart()
{
    const [ticketList,setTicketList] = useState([]);
    const [categoryCounts, setCategoryCounts] = useState({ access: 0, asset: 0, feedback: 0,general:0,network:0 });



useEffect(() => {
    const fetchData = async () => {
        const resp = await fetch("https://localhost:7057/api/tickets/");
        if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
      }
      const newData = await resp.json();
      setTicketList(newData); //save the list of newDate to the list
      console.log(newData);
    };
    fetchData();
}, []);
useEffect(()=>{

    const counts = ticketList.reduce((acc,ticket) => {
       
        if(ticket.CategoryName === "Access")
        {
            acc.access++;
        }
        else if(ticket.CategoryName === "Asset")
        {
         acc.asset++;
        }
        else if(ticket.CategoryName === "Feedback")
        {
            acc.feedback++
        }
        else if(ticket.CategoryName === "General")
        {
            acc.general++
        }
        else if(ticket.CategoryName === "Network")
        {
            acc.network++
        }
        return acc;
    },{access: 0, asset: 0, feedback: 0,general:0,network:0});
    setCategoryCounts(counts);
},[ticketList])
useEffect(() => {
  console.log("statusCounts changed:", categoryCounts);
}, [categoryCounts]);
const data = [
  { name: "Categories", Access: categoryCounts.access,Asset:categoryCounts.asset,Feedback:categoryCounts.feedback,General:categoryCounts.general,Network:categoryCounts.network }
];
    return(
        <div>
        <h1 className="dashboard-h1">Categories</h1>
            <div className="chart">
        <BarChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Access" fill="#8884d8" />
          <Bar dataKey="Asset" fill="#82ca9d" />
          <Bar dataKey="Feedback" fill="#82ca9d" />
          <Bar dataKey="General" fill="#82ca9d" />
          <Bar dataKey="Network" fill="#82ca9d" />

        </BarChart>
      </div>
        </div>
    )
}
export default BChart;