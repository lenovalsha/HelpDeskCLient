import Navbar from "./Navbar";
import "./admin.css";
import PChart from "./Piechart";
import BChart from "./BarChart";

function Dashboard() {
   
return (
    <div className="container">
      <Navbar />
      <div className="charts">
      <PChart/>
      <BChart/>
      </div>
      
    </div>
  );
}
export default Dashboard;
