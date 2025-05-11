"use client"

import React, { useEffect,useState } from "react"
import { useNavigate } from 'react-router-dom';

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import "../Dashboard/dashboard.css"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Pie, PieChart, Cell } from "recharts"



// const getData = async() =>{
  //     const data = await fetch()
  // }
  function Dashboard() {
      const navigate = useNavigate();
    
  const [counter, setCounter] = useState([]);
  const [customerCounter, setCustomerCounter] = useState([]);

  const token = localStorage.getItem('token');
  const [position, setPosition] = React.useState("bottom")
// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 90, fill: "var(--color-other)" },
// ]



  useEffect(()=>{
    fetch("http://localhost:8080/api/invoiceCounter",{
  
      method:"GET",
      headers:{
        Authorization: `Bearer ${token}`,
        "Content-Type":"application/json"
      }
    }
    )
    .then(res => {
      if (!res.ok) throw new Error("No Invoices found");
      return res.json();
    })
    .then(data => {
      console.log("API response:", data); // <--- Add this
      setCounter(data);
    })
    .catch(err => {
      console.log(err);
    })
  },[])








  useEffect(()=>{
    fetch("http://localhost:8080/api/customerCounter",{
  
      method:"GET",
      headers:{
        Authorization: `Bearer ${token}`,
        "Content-Type":"application/json"
      }
    }
    )
    .then(res => {
      if (!res.ok) throw new Error("No Customer found");
      return res.json();
    })
    .then(data => {
      console.log("API response:", data); // <--- Add this
      setCustomerCounter(data);
    })
    .catch(err => {
      console.log(err);
    })
  },[])






  
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },

    totalCustomers: {
    label: "totalCustomers",
  },
  Haryana: {
    label: "Haryana",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
};
const pieColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
];  
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white text-black dark:bg-black dark:text-white">
      {/* PROFILE BUTTON */}
      <div className="w-full flex justify-between pr-12 pt-4">
  <h1 className="text-2xl pl-32">
  Dashboard
  </h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white text-black dark:bg-black dark:text-white border-white ">PROFILE</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60 z-50" align="end">
            <DropdownMenuLabel>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://img.freepik.com/free-photo/3d-rendering-man-portrait_23-2150964650.jpg" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium font-serif">ADMIN</p>
                  <p className="text-xs text-muted-foreground pt-2">SID</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              <DropdownMenuRadioItem value="top"className="border-none">

              <Button onClick={handleLogout}   className="border bg-black text-white border-black dark:border-white">

              LOGOUT</Button>

              </DropdownMenuRadioItem>

            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
  
      {/* SEPARATOR LINE */}
      <div className="w-[85vw] border-b my-4" />
  
      {/* CENTERED CARD */}
      <div className="w-full flex justify-center px-4">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle>Total-Invoice Per Month Breakdown Graph</CardTitle>
            <CardDescription>May - October 2025</CardDescription>
          </CardHeader>
          <CardContent className="w-full h-[50vh]">
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={counter}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="monthName"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Line
                  dataKey="totalInvoices"
                  type="natural"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-desktop)" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none text-muted-foreground">
              Showing total invoices made in last 6 months
            </div>
          </CardFooter>
        </Card>
      </div>


      <Card className="flex flex-col mt-6 w-full">
  <CardHeader className="items-center pb-0">
    <CardTitle>Customer-region PieChart</CardTitle>
    <CardDescription>Total number of customers in each region</CardDescription>
  </CardHeader>
  <CardContent className="flex-1 pb-0">
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie data={customerCounter} dataKey="totalCustomers" label nameKey="state">
          {customerCounter.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={pieColors[index % pieColors.length] || "#FF0000"} // Using direct colors for debugging
            />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  </CardContent>
  <CardFooter className="flex-col gap-2 text-sm">
   
    <div className="leading-none text-muted-foreground">
      Showing total visitors for the last 6 months
    </div>
  </CardFooter>
</Card>


<footer className="text-center text-sm py-4 mt-4 text-muted-foreground border dark:bg-black dark:text-white border-black dark:border-white light:bg-white light:text-black w-full">
  ERP Dashboard v1.0 – © 2025 
</footer>

    </div>
  )
  
}

export default Dashboard
