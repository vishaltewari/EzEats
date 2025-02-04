'use client'
import React from 'react'
import { useState } from 'react'
import Customerheader from '../components/Customerheader'
import Footer from '../components/Footer'
import Usersignup from '../components/Usersignup'
import Userlogin from '../components/Userlogin'
const page = (props) => {
  const [login, setlogin] = useState(true)
  return (
    <div >
        <Customerheader />
        {/* {console.log(props)} */}
        <div className="container text-center">
    <div className=' text-2xl font-bold'>Welcome to EzEats</div>
    <div className=' text-xl '>{login?'User Login':'User signup'}</div>
    {
      login?<Userlogin redirect={props.searchParams}/>:<Usersignup redirect={props.searchParams}/>
    }
      <button className='hover:text-blue-300 font-bold' onClick={()=>setlogin(!login)}>
        {login?'Don\'t have an account?Signup':'Already have an account?Login'}
      </button>
      
        </div>
      <Footer/>
    </div>
  )
}

export default page
