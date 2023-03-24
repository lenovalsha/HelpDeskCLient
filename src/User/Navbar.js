import {Link} from 'react-router-dom'
import Logout from '../Component/Logout';

function Navbar(){
    return(
        <div className='top-container'>
        <h1>Company</h1>
        <nav>
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/userTicket">My Tickets</Link></li>
                <li><Link to="/form">Request Form</Link></li>
                <li><Logout/></li>
            </ul>
        </nav>
        </div>
    )
}
export default Navbar;