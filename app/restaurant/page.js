"use client"
import React from 'react'
import { useState } from 'react'
import Login from '../components/Login'
import Signup from '../components/Signup'
import AdminHeader from '../components/Adminheader'
import Footer from '../components/Footer'
const Restaurant = () => {
  const [login, setlogin] = useState(true)
  return (
    <>
   
      <AdminHeader/>
      <div className='text-center'>
      <h1>Resturant login/signup page</h1> 
      {
        login ? <Login /> : <Signup /> 
      }

        <button className='rounded-lg p-1 border-0 pointer bg-color-transparent text-sky-300 m-[20px]   ' onClick={() => setlogin(!login)}>{login ? "Do not have account?Sign Up" : "Already have account?Sign in"}</button>
      </div>
      <Footer/>
    </>
  )
}

export default Restaurant
