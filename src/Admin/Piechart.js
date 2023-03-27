import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import React, { PureComponent, useEffect, useState } from "react";
function PChart()
{
    const [ticketList,setTicketList] = useState([]);
    const [statusCounts, setStatusCounts] = useState({ pending: 0, inProgress: 0, completed: 0 });

    const COLORS = ["gray", "yellow", "green", "#FF8042"];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
        <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
};
useEffect(() => {
    const fetchData = async () => {
        const resp = await fetch("https://localhost7057/api/tickets/");
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
       
        if(ticket.StatusName === "Pending")
        {
            acc.pending++;
        }
       else if(ticket.StatusName === "In-Progress")
        {
         acc.inProgress++;

        }
        else if(ticket.StatusName === "Completed")
        {
            acc.completed++
        }
        return acc;
    },{pending:0,inProgress:0,completed:0});
    setStatusCounts(counts);
},[ticketList])
useEffect(() => {
  console.log("statusCounts changed:", statusCounts);
}, [statusCounts]);
const data = [
  { name: "pending", value: statusCounts.pending },
  { name: "in-progress", value: statusCounts.inProgress },
  { name: "completed", value: statusCounts.completed },
];
    return(
        <div>
            <h1 className="dashboard-h1">Status</h1>
        <div className="chart">
        <div>
          <label className="pending">Pending</label>
          <label className="in-progress">In-Progress</label>
          <label className="complete">Complete</label>
        </div>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
        </div>
    )
}
export default PChart;