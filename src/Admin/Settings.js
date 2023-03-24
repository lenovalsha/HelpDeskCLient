import Priorities from "./Priorities";
import Category from "./Category";
import Status from "./Status";
import Department from "./Department";
import Navbar from "./Navbar";
function Admin(){
        return(<div>
            <h1>Admin Page</h1>
            <Navbar/>
            <Category/>
            <Priorities/>
            <Status/>
            <Department/>
        </div>)
}

export default Admin;