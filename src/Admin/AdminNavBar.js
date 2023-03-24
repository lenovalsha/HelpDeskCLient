import { Link } from "react-router-dom";

function AdminNavBar(){
    return(<div>
    <ul>
       <li><Link to="/priorities">priorities</Link></li> 
       <li><Link to="/categories">categories</Link></li> 
    </ul>
    </div>)
}

export default AdminNavBar;