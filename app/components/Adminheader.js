"use client"
import Link from 'next/link'
import React from 'react'
import { useState,useEffect } from 'react'
import {  useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
const AdminHeader = () => {
  const [details, setdetails] = useState()
  const router=useRouter();
  const pathname=usePathname()
  useEffect(() => {
    let data=localStorage.getItem('restaurantuser')
    if(!data && pathname==='/restaurant/dashboard'){
      router.push('/restaurant')
    }else if(data&&pathname=='/restaurant'){
      router.push('/restaurant/dashboard')

    }
    else{
      setdetails(JSON.parse(data))
    }
  
  },[])
  const logout=()=>{
    localStorage.removeItem('restaurantuser')
    router.push('/restaurant')
  }
  return (
    <>
      <div className="logo flex justify-between ">
        <img src="/logo.gif" width={35} height={35} className='rounded-lg' alt="" srcSet="" />
        <ul className='flex list-none justify-between gap-5'>
            <li className='p-[5px]'>
                <Link className='no-underline' href="/">Home</Link>
            </li>
            
              {
                details&&details.name?
                <>
                <li className='p-[5px]'> <Link className='no-underline' href="/">Profile</Link> </li>
                <li className='p-[5px]'> <button onClick={logout} className='border rounded-lg'>Logout</button> </li>
                </>
                : <li className='p-[5px]'>
                <Link className='no-underline' href="/">Login/Signup</Link>
            </li>
              }
               
           
           
        </ul>       
      </div>
    </>
  )
}

export default AdminHeader
