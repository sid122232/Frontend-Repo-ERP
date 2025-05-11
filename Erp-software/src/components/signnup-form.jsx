import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RiLockPasswordLine } from "react-icons/ri"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function SignupForm({ className, ...props }) {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  const toggleVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    const response = await fetch("http://localhost:8080/public/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName.trim(),
        password: password.trim(),
      }),
    })

    const data = await response.json()
    if (response.ok) {
      localStorage.setItem("token", data.jwtToken)
      alert("Login successful")
      setIsAuthenticated(true)
      navigate("/employee/fillDetails")
    } else {
      console.log("Login error: ", data)
      alert("Login failed: " + (data?.error || "Unknown error"))
    }
  }

  return (
    <div className="border rounded-lg shadow-xl">

    <form onSubmit={handleLogin} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">SignUp account</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Username</Label>
          <Input
            id="email"
            type="text"
            placeholder="Enter username"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)
          
            }
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <RiLockPasswordLine
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={toggleVisibility}
            />
          </div>
        </div>
        <Button type="submit" className=" btn w-full">
          SignUp
        </Button>
      </div>
     
    </form>
    </div>
  )
}
