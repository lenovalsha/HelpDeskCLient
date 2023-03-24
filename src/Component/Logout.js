import {Link,useNavigate} from 'react-router-dom'
import {useEffect,useState} from 'react'
function Logout(){
   const navigate = useNavigate();

    function logout(){
        
        sessionStorage.clear(); //clear our storage so we cant access the form after logging out
        navigate("/logins");
      }
    return(
        <li onClick={logout}><a>Logout</a></li>
    )

}
export default Logout;