import * as React from "react"
import { useLocation } from "react-router-dom";
import { FaMoon } from "react-icons/fa6";
import { IoSunnyOutline } from "react-icons/io5";
import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import { useEffect, useState } from 'react';
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import { IoMdPeople } from "react-icons/io";
import { AiFillDatabase } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa6";
import { useTheme } from "next-themes";







import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [

    {
    
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: <MdOutlineDashboard />,
       
        },
        {
          title: "Customers",
          url: "/Customers",
          icon : <IoMdPeople />
          // isActive: true,
        
        },
        {
          title: "Set Customers",
          url: "/customerData",
          icon : <AiFillDatabase />

        },
        {
          title: "Employee",
          url: "/employee",
          icon : <FaPeopleGroup />

        },
    
        {
          title: "Create Invoice",
          url: "/invoice-creation",
          icon : <FaFileInvoice />

        },
       
      ],
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  
  const navigate = useNavigate();

 
  const { setTheme, theme,  resolvedTheme } = useTheme();


       
  const location = useLocation(); // Get the current location from the router
const isActive = (url)=>location.pathname === url;
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher versions={data.versions} defaultVersion={data.versions[0]} />
      </SidebarHeader>
      <SidebarContent>
             <li className='navs center m-auto mb-1' onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}

              > 

{resolvedTheme === "dark" ? <FaMoon />:<IoSunnyOutline /> }
</li>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="mb-12" >
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title} >
                    <SidebarMenuButton asChild className={isActive(item.url) ? " menu-item" : ""}>
                      <a href={item.url}
                       className={isActive(item.url) ? "active" : ""}

                      >
                         {item.icon}
                      {item.title}</a>
                    </SidebarMenuButton>

                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
