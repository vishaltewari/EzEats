'use client'
import React from 'react'
import { useState,useEffect } from 'react'
import Customerheader from '../components/Customerheader'
import Footer from '../components/Footer'

const page = () => {
    const [myorders, setmyorders] = useState([])
    
    const getmyorders=async() => {
      const userstorage=JSON.parse(localStorage.getItem('user'))

        let response=await fetch('http://localhost:3000/api/order?id='+userstorage._id)
        response=await response.json()
        if(response.success){
            setmyorders(response.result)
            
        }
    }
    useEffect(() => {
      getmyorders()
    }, [])
    // console.log(myorders);
  return (
    <div>
      <Customerheader/>
      {
        myorders.map((item)=>(
            <div className='w-[45%] bg-orange-500 m-[10px] p-[10px] border border-[#aaa] rounded-md cursor-pointer ml-auto mr-auto'>
                <h4>Name: {item.data.name}</h4>
                <div>Amount: {item.amount}</div>
                <div>Address: {item.data.address}</div>
                <div>Status: {item.status}</div>
                
            </div>
        ))
      }
      <Footer/>
    </div>
  )
}

export default page
