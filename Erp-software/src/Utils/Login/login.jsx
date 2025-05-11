import React from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordLine } from "react-icons/ri";
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { GalleryVerticalEnd } from "lucide-react"
import {LoginForm} from '../../components/login-form'
import erpImage from '../images/erpImage.jpg'
import mountainImage from '../images/mountainImage.avif'







function Login() {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const navigate = useNavigate();

const [userName, setUserName] = useState('')
const [password, setPassword] = useState('')
const [showPassowrd,setShowPassword] = useState(false)

//Handle input change
const handleLogin = async (e) => {
    e.preventDefault();
  
    const response = await fetch("http://localhost:8080/public/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName.trim(),
        password: password.trim(),
      }),
    });
  
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.jwtToken);
      alert("Login successful");
      setIsAuthenticated(true);
      navigate("/dashboard");
    } else {
      console.log("Login error: ", data);
      alert("Login failed: " + (data?.error || "Unknown error"));
    }
  };
const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setIsAuthenticated(false)  };
    const toggleVisibility= ()=>{
      setShowPassword(!showPassword)
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
            <LoginForm />
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


export default Login
