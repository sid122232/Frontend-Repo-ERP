import React from 'react';

import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Customers from './Utils/Customers/customers.jsx';
import SendingData from './Utils/Customers/SendingData.jsx';
import SignUp from './Utils/SignUp/signUp.jsx';
import MyEmployees from './Utils/Employees/employees.jsx';
import Layout from './Utils/Layout/layout.jsx';
import Dashboard from './Utils/Dashboard/dashboard.jsx';
import Invoice from './Utils/invoice/invoiceTemp.jsx';
import InvoiceGeneration from './Utils/invoice/invoiceGeneration.jsx';
import './App.css';
import Login from './Utils/Login/login.jsx';
import { ThemeProvider } from 'next-themes'



function App() {
  const [invoiceData, setInvoiceData] = useState(null);

  // useEffect(() => {
  //   const saved = localStorage.getItem('invoice');
  //   if (saved) {
  //     try {
  //       setInvoiceData(JSON.parse(saved));
  //     } catch (error) {
  //       console.error("Failed to parse invoice data", error);
  //     }
  //   }
  // }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/invoice" element={<Invoice invoice={invoiceData} />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Customers" element={<Customers />} />
          <Route path="/customerData" element={<SendingData />} />
          <Route path="/employee" element={<MyEmployees />} />
          <Route path="/invoice-creation" element={<InvoiceGeneration  onGenerate={setInvoiceData}/>} />

          {/* Invoice Form */}
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>

  );
}



export default App;
