import './App.css';
import './Component/index.css'
import './User/index.css'

import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import Login from './Component/Login';
import Register from './Component/Register';
import Form from './User/Form';
import Navbar from './Component/Navbar';
// ============================================ADMIN
import AdminDashboard from './Admin/Dashboard';
import Settings from './Admin/Settings';
import AdminTickets from './Admin/Tickets'
import Staff from './Admin/Staff';
// ============================================STAFF
import StaffPanel from './Staff/StaffPanel';
import Chat from './Staff/Chat';
import StaffTicket from './Staff/Tickets';
// ============================================USER
import UserTickets from './User/Tickets';
import { useEffect } from 'react';

function App() {
return (
  <BrowserRouter>
    {/* <Navbar/> */}
      <Routes>
        <Route path='/loginAdmin' element={<Login userLevel = "admins"/>}/>
        <Route path='/registerAdmin' element={<Register userLevel = "admins" />}/>
        <Route path='/loginStaff' element={<Login userLevel = "staffs"/>}/>
        <Route path='/registerStaff' element={<Register userLevel = "staffs" />}/>
        <Route path='/login' element={<Login userLevel = "users"/>}/>
        <Route path='/register' element={<Register userLevel = "users" />}/>
        <Route path='/logins' element={<Navbar/>}/>
        
        {/* ============================================================================= */}
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/adminTickets' element={<AdminTickets/>}/>
        <Route path='/adminDashboard' element={<AdminDashboard/>}/>
        <Route path='/staff' element={<Staff/>}/>

        {/* ============================================================================== */}
        <Route path='/staffpanel' element={<StaffPanel/>}/>
        <Route path='/staffTickets' element={<StaffTicket/>}/>
        {/* ------------------------------------------------------------------------------- */}
        <Route path='/form' element={<Form/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/userTicket' element={<UserTickets/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
