import React from 'react'
import { useState,useEffect} from 'react';
import './customers.css';
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material"; // MUI Component
import { useNavigate } from 'react-router-dom';



function Customers() {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "companyName", headerName: "Product", width: 200 },
    { field: "zone", headerName: "Zone", width: 130 },
    { field: "state", headerName: "State", width: 130 },
    { field: "classification", headerName: "Classification", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "number", headerName: "Phone Number", width: 150 },
  ];
  
  const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();
  
  // Fetch Customers from backend on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    fetch("http://localhost:8080/api", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      if (!res.ok) {
        alert("Unauthorized or error fetching customers");
        navigate("/");  // 👈 optional redirect if not authorized
        throw new Error("Unauthorized or error");
      }
      return res.json();
    })
    .then(data => {
      console.log("API response:", data);
      setCustomers(data); // ✅ this sets the state
    })
    .catch((error) => console.log("Error fetching customers", error));
  }, []);
  
  const rows = customers.map((customer, index)=>({
    id:customer.id,
    companyName:customer.companyName,
    zone:customer.zone,
    state:customer.state,
    classification:customer.classification,
    name:customer.name,
    number:customer.number


  }))
  return(
    
    <Box 
    sx={{ 
      width: "100%", 
      p: 2, 
    

      borderRadius: 2,
      boxSizing: "border-box",
      overflowX: "auto",
      marginLeft: "-40px",
    }}
  >
<h1 className='h1'>Customers</h1>
<div className="w-[85vw] border-b my-4" />
<DataGrid
    autoHeight
    sx={{
      minWidth: "1000px", // This ensures it's scrollable if needed
      backgroundColor: "var(--box-primary)", // Background color for the grid
      color: "var(--box-text)",
      marginLeft:"14px", // Text color for the grid
      "& .MuiDataGrid-columnHeaders": {
        backgroundColor: "var(--box-primary)", // Column header background
        color: "black", // Column header text color
        fontSize: "16px",
      },
      "& .MuiDataGrid-row": {
        fontSize: "14px",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.1)", // Lighter hover background
        },
      },
      "& .MuiTablePagination-root": {
        backgroundColor: "var(--box-primary)", // Dark background for pagination controls
        color: "var(--box-text)", // White text for pagination
      },
    }}
    rows={rows}
    columns={columns}
    pageSizeOptions={[5, 10, 20, 50, 100]}
    checkboxSelection
  />
</Box>
);
}


export default Customers;
