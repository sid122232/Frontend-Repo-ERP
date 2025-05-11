import React from 'react'
import Sidebar from '../Sidbar/sidebar'
import { Outlet } from 'react-router-dom'; // this is key!


function Layout() {
    
    return (
    <div className='app-layout'>
        <Sidebar/>
        <div className='main-content'>
        <Outlet/>
    </div>    
    </div>
    )
}

export default Layout
