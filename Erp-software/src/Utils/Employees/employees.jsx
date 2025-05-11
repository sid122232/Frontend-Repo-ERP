import React, { useEffect, useState } from 'react';
import '../Employees/employees.css'

function MyEmployees() {
  const [employees, setEmployees] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:8080/employee', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) throw new Error("Fill the employees first");
      return res.json();
    })
    
    .then(data => {
        console.log("API response:", data); // <--- Add this
        setEmployees(data);
      })
      
    .catch(err => alert(err.message));
  }, []);

  return (
//     <div className='main justify-center w-[400px] p-4'>
//       <h2>My Employees</h2>
//       <ul>
//         {employees.map(emp => (
//           <li key={emp.userName}>{emp.name} — {emp.designation}</li>
//         ))}
//       </ul>
//       {employees.map((emp, i) => (
//         <div className="employee-details"
//         key={i}>
//   <div className="section-title">EMPLOYEE DETAILS</div>
//   <div className="details-grid">
//     <div className="detail-box">
//       <label>Employee Name</label>
//       <div className="value">{emp.name}</div>
//     </div>
//     <div className="detail-box">
//       <label>Employee Age</label>
//       <div className="value">{emp.age}</div>
//     </div>
//     <div className="detail-box">
//       <label>Email</label>
//       <div className="value" >{emp.email}</div>
//     </div>
//     <div className="detail-box">
//       <label>Phone Number</label>
//       <div className="value">{emp.phoneNumber}</div>
//     </div>
//     <div className="detail-box">
//       <label>Department</label>
//       <div className="value">{emp.department}</div>
//     </div>
//     <div className="detail-box">
//       <label>Designation</label>
//       <div className="value">{emp.designation}</div>
//     </div>
//     <div className="detail-box">
//       <label>Country</label>
//       <div className="value">India</div>
//     </div>
//     <div className="detail-box">
//       <label>City/Town</label>
//       <div className="value">New Delhi</div>
//     </div>
//   </div>
// </div>

// ))}


//     </div>
<div className="w-full px-4">

      <h2 className='font-bold from-stone-800 text-2xl pt-5'>My Employees</h2>
<div className='main-container w-full px-4"'>  

{employees.map((emp,i)=>(

  <div className="employee-details  "
        key={i}>
  <div className="details-grid">
    <div className="detail-box">
      <label>Employee Name</label>
      <div className="value">{emp.name}</div>
    </div>
    <div className="detail-box">
      <label>Employee Age</label>
      <div className="value">{emp.age}</div>
    </div>
    <div className="detail-box">
      <label>Email</label>
      <div className="value" >{emp.email}</div>
    </div>
    <div className="detail-box">
      <label>Phone Number</label>
      <div className="value">{emp.phoneNumber}</div>
    </div>
    <div className="detail-box">
      <label>Department</label>
      <div className="value">{emp.department}</div>
    </div>
    <div className="detail-box">
      <label>Designation</label>
      <div className="value">{emp.designation}</div>
    </div>
    <div className="detail-box">
      <label>Country</label>
      <div className="value">India</div>
    </div>
    <div className="detail-box">
      <label>City/Town</label>
      <div className="value">New Delhi</div>
    </div>
  </div>
</div>

)
  )}
</div>
<footer className="text-center text-sm py-4 mt-4 text-muted-foreground">
  ERP Employees v1.0 – © 2025 
</footer>
  </div>
  )
}

export default MyEmployees;
