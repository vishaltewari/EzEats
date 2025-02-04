"use client"
import React from 'react'
import AdminHeader from '@/app/components/Adminheader'
import Addfooditem from '@/app/components/Addfooditem'
import { useState } from 'react'
import Fooditemlist from '@/app/components/Fooditemlist'
const Dashboard = () => {
  const [additem, setadditem] = useState(false)
  return (
    <div>
        <AdminHeader/>
        <button onClick={()=>setadditem(true)} className='border border-white'>Add food item</button>
        <button onClick={()=>setadditem(false)} className='border border-white'>Dashboard</button>
        {additem? <Addfooditem setadditem={setadditem}/>:<Fooditemlist/>
        }

    </div>
  )
}

export default Dashboard
