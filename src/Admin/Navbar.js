import {Link} from 'react-router-dom'
function Navbar(){
    return(
        <div className='top-container'>
        <h1>Company</h1>
        <nav>
            <ul>
                <li><Link to="/adminDashboard">Dashboard</Link></li>
                <li><Link to="/adminTickets">Tickets</Link></li>
                <li><Link to="/staff">Staff</Link></li>
                <li><Link to="/settings">Settings</Link></li>
            </ul>
        </nav>
        </div>
    )
}
export default Navbar;