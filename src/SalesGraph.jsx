import React from 'react'
import { LineChart,BarChart,Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const SalesGraph = () => {

const dummyData = [
    { month: "Jan", sales: 400 },
    { month: "Feb", sales: 800 },
    { month: "Mar", sales: 600 },
    { month: "Apr", sales: 700 },
    ];
    
    const dummyData1 = [
        { category: "Social Media", leads: 300 },
        { category: "Email", leads: 450 },
        { category: "SEO", leads: 200 },
        { category: "Ads", leads: 600 },
    ];
  return (
    <div className='flex'>
      <ResponsiveContainer width="50%" height={300} >
            <LineChart data={dummyData}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          
          
          <ResponsiveContainer width="50%" height={300}>
            <BarChart data={dummyData1}>
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="leads" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default SalesGraph
