import Navbar from "./Navbar";
import "./admin.css";
import PChart from "./Piechart";
import BChart from "./BarChart";

function Dashboard() {
  return (
    <div className="application">
      <Navbar />
      <div className="container">
        <div className="charts">
          <PChart />
          <BChart />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
