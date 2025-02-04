'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useState,useEffect } from 'react'
import Deliveryheader from '../components/Deliveryheader'
import Footer from '../components/Footer'
const page = () => {
    const [loginmobile, setloginmobile] = useState('')
    const [loginpassword, setloginpassword] = useState('')
    //ss
    const [name, setname] = useState('')
    
    const [password, setpassword] = useState('')
    const [cpassword, setcpassword] = useState('')
    const [address, setaddress] = useState('')
    const [contact, setcontact] = useState('')
    const [city, setcity] = useState('')
   const router=useRouter()
   const [loginstatus, setloginstatus] = useState(false)
    const handlesignup = async() => {
        console.log(name, password, cpassword, address, contact, city)
        let response=await fetch('/api/deliverpartners/signup',{
            method:'POST',
            body:JSON.stringify({name,mobile:contact,password,city,address})

        })
        response=await response.json()
        if(response.success){
            const {result}=response
            delete result.password
            localStorage.setItem('delivery',JSON.stringify(result))
            setloginstatus(true)
            alert("Signup Success ")
        }else{
            alert('Invalid')
        }
    }
    const handlelogin=async() => {
        // console.log(email,password)
        let response=await fetch('/api/deliverpartners/login',{
          method:'POST',
          body:JSON.stringify({mobile:loginmobile,password:loginpassword})
  
      })
      response=await response.json()
      if(response.success){
          const {result}=response
          delete result.password
          localStorage.setItem('delivery',JSON.stringify(result))
          setloginstatus(true)
         alert("Success")
         
         router.push('/deliverydashboard')
         
      }else{
        alert("Invalid email or password.Please Try Again")
      }
      }

     useEffect(() => {
       
        const delivery=JSON.parse(localStorage.getItem('delivery'))
        if(delivery){
            router.push('/deliverydashboard')
        }
     }, [])
     
     return (
        <>
          <Deliveryheader loginstatus={loginstatus} />
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold mb-8">Delivery Partner</div>
          <div className="auth-container flex flex-wrap justify-center gap-8">
            <div className="login-wrapper h-auto border border-gray-300 m-4 p-6 w-full md:w-[40%] text-center bg-white shadow-lg rounded-lg">
              <h1 className="font-bold text-2xl mb-6">Login</h1>
              <div className="m-6">
                <input
                  value={loginmobile}
                  onChange={(e) => setloginmobile(e.target.value)}
                  className="w-[80%] h-[40px] p-[10px] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                  type="text"
                  placeholder="Enter Mobile No."
                />
              </div>
              <div className="m-6">
                <input
                  value={loginpassword}
                  onChange={(e) => setloginpassword(e.target.value)}
                  className="w-[80%] h-[40px] p-[10px] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                  type="password"
                  placeholder="Enter Password"
                />
              </div>
              <div className="inputcontainer m-6">
                <button
                  onClick={handlelogin}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-black rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                >
                  <span className="text-black font-bold relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-[#f5f5dc] rounded-md group-hover:bg-opacity-0">
                    Login
                  </span>
                </button>
              </div>
            </div>
            <div className="signup-wrapper h-auto border border-gray-300 m-4 p-6 w-full md:w-[40%] text-center bg-white shadow-lg rounded-lg">
              <h1 className="font-bold text-2xl mb-6">Signup</h1>
              <div className="inputcontainer m-6">
                <input
                  type="text"
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                  className="w-[80%] h-[40px] p-[10px] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                  placeholder="Enter your Name"
                />
              </div>
              <div className="inputcontainer m-6">
                <input
                  type="password"
                  onChange={(e) => setpassword(e.target.value)}
                  value={password}
                  className="w-[80%] h-[40px] p-[10px] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                  placeholder="Set Password"
                />
              </div>
              <div className="inputcontainer m-6">
                <input
                  type="password"
                  onChange={(e) => setcpassword(e.target.value)}
                  value={cpassword}
                  className="w-[80%] h-[40px] p-[10px] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="inputcontainer m-6">
                <input
                  type="text"
                  onChange={(e) => setcity(e.target.value)}
                  value={city}
                  className="w-[80%] h-[40px] p-[10px] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                  placeholder="Enter City"
                />
              </div>
              <div className="inputcontainer m-6">
                <input
                  type="text"
                  onChange={(e) => setaddress(e.target.value)}
                  value={address}
                  className="w-[80%] h-[40px] p-[10px] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                  placeholder="Enter your address"
                />
              </div>
              <div className="inputcontainer m-6">
                <input
                  type="text"
                  onChange={(e) => setcontact(e.target.value)}
                  value={contact}
                  className="w-[80%] h-[40px] p-[10px] rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="inputcontainer m-6">
                <button
                  onClick={handlesignup}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-black rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                >
                  <span className="text-black font-bold relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-[#f5f5dc] rounded-md group-hover:bg-opacity-0">
                    Confirm
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        </>
        
      );
}

export default page
