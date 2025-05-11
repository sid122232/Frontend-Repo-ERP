import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

function InvoiceGeneration({ onGenerate = () => {} }) {
  const navigate = useNavigate();

  const [data, setData] = useState({
    companyName: "",
    customerName: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    gstNumber: "",
    email: "",
    invoiceNumber: "",
    date: "",
    poNumber: "",
    poDate: "",
    gstRate: 18,
    tax1: "",
    tax2: "",
    items: [
      {
        description: "",
        hsn: "",
        unitPrice: "",
        quantity: "",
   
      },
    ],
  });

  useEffect(() => {
    const savedData = localStorage.getItem("invoiceFormData");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("invoiceFormData", JSON.stringify(data));
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleArrayChanges = (index, field, value) => {
    const updatedItems = [...data.items];
    updatedItems[index][field] = value;
    setData({ ...data, items: updatedItems });
  };

  const addNewEntry = () => {
    setData({
      ...data,
      items: [
        ...data.items,
        { description: "", hsn: "", unitPrice: "", quantity: ""},
      ],
    });
  };


  const removeEntry = (indexToRemove) => {
    setData({
      ...data,
      items: data.items.filter((_, index) => index !== indexToRemove),
    });
  };
  
  const handleGenerateInvoice = async (e) => {
    e.preventDefault();
    try {
      console.log("Invoice data before submitting:", data); // Check if tax1 and tax2 are included

      const response = await fetch('http://localhost:8080/invoice', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Invoice from backend:", result); // Check if tax1 and tax2 are returned correctly
        onGenerate(result);
        localStorage.setItem("invoice", JSON.stringify(result));

        // Reset form
        setData({ 
          companyName: "",
          customerName: "",
          phoneNumber: "",
          streetAddress: "",
          city: "",
          state: "",
          gstNumber: "",
          email: "",
          invoiceNumber: "",
          date: "",
          poNumber: "",
          poDate: "",
          gstRate: 18,
          tax1: "",
          tax2: "",
          items: [
            { description: "", hsn: "", unitPrice: "", quantity: "" },
          ],
        });
        navigate('/invoice');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container main border rounded-3xl shadow-3xl w-96  mt-10 p-5 relative left-72 ">
      <h1 className="text-2xl h1">Generate Invoice</h1>
      <form onSubmit={handleGenerateInvoice}>
        <input name="companyName" placeholder="Company Name" value={data.companyName} onChange={handleChange} />
        <input name="customerName" placeholder="Customer Name" value={data.customerName} onChange={handleChange} />
        <input name="phoneNumber" placeholder="Customer Phone Number" value={data.phoneNumber} onChange={handleChange} />
        <input name="streetAddress" placeholder="Street Address" value={data.streetAddress} onChange={handleChange} />
        <input name="city" placeholder="City" value={data.city} onChange={handleChange} />
        <input name="state" placeholder="State" value={data.state} onChange={handleChange} />
        <input name="gstNumber" placeholder="GST Number" value={data.gstNumber} onChange={handleChange} />
        <input name="email" placeholder="Customer Email Address" value={data.email} onChange={handleChange} />
        <input name="poDate" placeholder="PO Date (DD/MM/YYYY)" value={data.poDate} onChange={handleChange} />

        <h3>Products</h3>
        {data.items.map((item, index) => (
          <div key={index}>
          <div>

            <input
              type="text"
              placeholder="Description"
              value={item.description}
              onChange={(e) => handleArrayChanges(index, "description", e.target.value)}
            />
            <input
              type="text"
              placeholder="HSN Code"
              value={item.hsn}
              onChange={(e) => handleArrayChanges(index, "hsn", e.target.value)}
            />
            <input
              type="text"
              placeholder="Unit Price"
              value={item.unitPrice}
              onChange={(e) => handleArrayChanges(index, "unitPrice", e.target.value)}
            />
            <input
              type="text"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleArrayChanges(index, "quantity", e.target.value)}
            />
              <button className='button' type="button" onClick={addNewEntry}>Add Product</button>
              <button className='button mt-6' type="button" onClick={()=>removeEntry(index)} disabled={index === 0}>Remove Product</button>
          </div>

<div>

  
</div>
         

            {/* Render SGST and CGST Headings Based on Selection */}
   
          </div>
        ))}

      
        <br /><br />
        <label>Select Tax Type 1:</label>
        <select name="tax1" value={data.tax1} onChange={handleChange}>
        <option value="">None</option>
              <option value="SGST">SGST</option>
              <option value="CGST">CGST</option>
              <option value="GST">GST</option>
            </select>

            <label>Select Tax Type 2:</label>
            <select name="tax2" value={data.tax2} onChange={handleChange}>
            <option value="">None</option>
              <option value="SGST">SGST</option>
              <option value="CGST">CGST</option>
              <option value="GST">GST</option>
            </select>
        <button type="submit">Generate Invoice</button>
      </form>
    </div>
  );
}

export default InvoiceGeneration;
