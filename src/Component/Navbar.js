import {Link,useNavigate} from 'react-router-dom'
import {useEffect,useState} from 'react'

function Navbar(){
   
    return(
        <div>
            <ul>
                <li><Link to="/loginAdmin">Admin Login</Link></li>
                <li><Link to="/registerAdmin">Register Admin</Link></li>
                <li><Link to="/loginStaff">Staff Login</Link></li>
                <li><Link to="/registerStaff">Register Staff</Link></li>
                <li><Link to="/login"> Login</Link></li>
                <li><Link to="/register">Register </Link></li>
            </ul>
        </div>
    )
}
export default Navbar;