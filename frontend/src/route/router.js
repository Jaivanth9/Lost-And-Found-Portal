import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home.js';
import Signup from '../pages/signup.js';
import Login from '../pages/login.js';
import Dashboard from '../pages/dashboard.js';
import { ToastContainer } from 'react-toastify';
import LostForm from '../pages/LostForm.js';
import DisplayLost from '../pages/DisplayLost.js';
import DisplayFound from '../pages/DisplayFound.js';
import MDashboard from '../pages/MDashboard.js';
import MLogin from '../pages/MLogin.js';
import MSignup from '../pages/MSignup.js';

const Routerr = () => {
  return (
    <div>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/lostForm' element={<LostForm/>}/>
        <Route path='/displaylost' element={<DisplayLost/>}/>
        <Route path='/displayfound' element={<DisplayFound/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>

        {/* moderator */}
        <Route path='/moddisplaylost' element={<MDashboard/>}/>
        <Route path='/modlogin' element={<MLogin/>}/>
        <Route path='/modsignup' element={<MSignup/>}/>
      </Routes>
    </div>
  )
}

export default Routerr;
