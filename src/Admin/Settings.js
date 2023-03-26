import Priorities from "./Priorities";
import Category from "./Category";
import Status from "./Status";
import Department from "./Department";
import Navbar from "./Navbar";
function Admin(){
        return(<div className="application">
        
            <Navbar/>
            <div className="container">
            <div className="flexWrap">
            <Category/>
            <Priorities/>
            <Status/>
            <Department/>
            </div>
            </div>
        </div>)
}

export default Admin;