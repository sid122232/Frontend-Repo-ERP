import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMoon } from "react-icons/fa6";
import { IoSunnyOutline } from "react-icons/io5";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  import { Separator } from "@/components/ui/separator"
  import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
  } from "@/components/ui/sidebar"

  import { AppSidebar } from "@/components/app-sidebar"

function Sidebar() {
    const [changeTheme, setChangeTheme] = useState(true)
    const [light, setLight] = useState()
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;


    useEffect(()=>{
        if(changeTheme){
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');

        }
else{
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
}

    },[changeTheme])

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <SidebarProvider>
        
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2  px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          
          </header>
          {/* <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </div> */}
        </SidebarInset>
      </SidebarProvider>
    );
}

export default Sidebar;
