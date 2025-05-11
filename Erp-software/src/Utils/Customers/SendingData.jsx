import React, { useState } from 'react';
import './customers.css'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

function SendingData() {
    // State inside the component
    const [submit , setSubmit] = useState("");
    const [formData, setFormData] = useState({
        companyName: "",
        zone: "",
        state: "",  
        classification: "",
        name: "",
        number: ""
    });

    // Handle input changes
    const handleChangeRequired = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault(); // Prevents page reload
        try {
            const response = await fetch("http://localhost:8080/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log("Data is sent successfully");
                setFormData({
                    companyName: "",
                    zone: "",
                    state: "",
                    classification: "",
                    name: "",
                    number: ""
                });
               setSubmit("Your data has been submitted!");
            } else {
                alert("Error submitting data");
                setSubmit("Your data is not submitted")
            }
        } catch (error) {
            console.error("Error:", error);
        }
        
    };

    return (
        <div className='relative left-56'>  
  <h1 className='h1' >
    Enter customers
  </h1>
        <div className='main border rounded-2xl shadow-2xl w-96  bg-black text-white border-black dark:border-white mt-10 p-5 ml-32 '>

        <form  onSubmit={handleFormSubmit} >
        <div className="grid gap-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            name="companyName"
            type="text"
            placeholder="Enter the company name"
            required
            value={formData.companyName}
            onChange={handleChangeRequired}
            className="    w-full 
    px-4 py-2 
    border 
    border-black 
    dark:border-white 
    rounded-2xl 
    text-black 
    dark:text-white 
    bg-white 
    dark:bg-black 
    placeholder-gray-500 
    dark:placeholder-gray-400 
    focus:outline-none 
    focus:ring-2 
    focus:ring-offset-2 
    focus:ring-black 
    dark:focus:ring-white 
    transition-colors"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="zone">Zone</Label>
          <Input
            id="zone"
            name="zone"
            type="text"
            placeholder="Enter the zone"
            required
            value={formData.zone}
            onChange={handleChangeRequired}
            className="    w-full 
    px-4 py-2 
    border 
    border-black 
    dark:border-white 
    rounded-2xl 
    text-black 
    dark:text-white 
    bg-white 
    dark:bg-black 
    placeholder-gray-500 
    dark:placeholder-gray-400 
    focus:outline-none 
    focus:ring-2 
    focus:ring-offset-2 
    focus:ring-black 
    dark:focus:ring-white 
    transition-colors"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="state">State</Label>
          <Input
          id="state"
          name="state"
            type="text"
            placeholder="Enter the State"
            required
            value={formData.state}
            onChange={handleChangeRequired}
            className="    w-full 
    px-4 py-2 
    border 
    border-black 
    dark:border-white 
    rounded-2xl 
    text-black 
    dark:text-white 
    bg-white 
    dark:bg-black 
    placeholder-gray-500 
    dark:placeholder-gray-400 
    focus:outline-none 
    focus:ring-2 
    focus:ring-offset-2 
    focus:ring-black 
    dark:focus:ring-white 
    transition-colors"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="classification">Classification</Label>
          <Input
          id="classification"
        name="classification"
            type="text"
            placeholder="Trader/OEM/..."
            required
            value={formData.classification}
            onChange={handleChangeRequired}
            className="    w-full 
    px-4 py-2 
    border 
    border-black 
    dark:border-white 
    rounded-2xl 
    text-black 
    dark:text-white 
    bg-white 
    dark:bg-black 
    placeholder-gray-500 
    dark:placeholder-gray-400 
    focus:outline-none 
    focus:ring-2 
    focus:ring-offset-2 
    focus:ring-black 
    dark:focus:ring-white 
    transition-colors"
          />
        </div>
        <div className="grid gap-2 flex-col">
          <Label htmlFor="name">Customer Name</Label>
          <Input
    id="name"
    name="name"
            type="text"
            placeholder="Enter the Customer Name"
            required
            value={formData.name}
            onChange={handleChangeRequired}
            className="    w-full 
    px-4 py-2 
    border 
    border-black 
    dark:border-white 
    rounded-2xl 
    text-black 
    dark:text-white 
    bg-white 
    dark:bg-black 
    placeholder-gray-500 
    dark:placeholder-gray-400 
    focus:outline-none 
    focus:ring-2 
    focus:ring-offset-2 
    focus:ring-black 
    dark:focus:ring-white 
    transition-colors"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="number">Customer Number</Label>
          <Input
   id="number"
   name="number"
            type="number"
            placeholder="Enter the customer number"
            required
            value={formData.number}
            onChange={handleChangeRequired}
            className="    w-full 
    px-4 py-2 
    border 
    border-black 
    dark:border-white 
    rounded-2xl 
    text-black 
    dark:text-white 
    bg-white 
    dark:bg-black 
    placeholder-gray-500 
    dark:placeholder-gray-400 
    focus:outline-none 
    focus:ring-2 
    focus:ring-offset-2 
    focus:ring-black 
    dark:focus:ring-white 
    transition-colors"
          />
        </div>
            <Button type="submit" className='btn'>Submit</Button>
        </form>
        <h1>
 {submit}
        </h1>
        </div>
        </div>
    );
}

export default SendingData;
