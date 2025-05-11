import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { GalleryVerticalEnd } from "lucide-react"
import {SignupForm} from '../../components/signnup-form'
import erpImage from '../images/erpImage.jpg'
import mountainImage from '../images/mountainImage.avif'

const SignUp = ()=>{

            const navigate = useNavigate();
    
    
    const [formData, setFormData] = useState({
        userName : "",
        password : ""
})


//Handle input change
const handleChangeRequired = (e)=>{
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })
}

const handleFormSubmit = async (e)=>{
    e.preventDefault();
try {
    const response = await fetch('http://localhost:8080/public/signup', {
        method:"POST",
headers:{
    "Content-Type":"application/json"
},
body:JSON.stringify(formData)
     })
     if(response.ok){
        setFormData({
            userName : "",
            password : ""
        })
        alert("Successfully Signed up!");
        navigate('/')
        
     }
} catch (error) {
    console.error("Error", error)
    
    
}

}


return (
   <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            {/* <a href="#" className="flex items-center gap-2 font-medium">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
            </a> */}
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <SignupForm />
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <img
            src={mountainImage}
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.7] dark:grayscale"
          />
        </div>
      </div>
    )
}


export default SignUp
