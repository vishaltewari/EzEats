
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { set } from 'mongoose'
const Signup = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [c_password, setc_password] = useState('')
  const [name, setname] = useState('')
  const [city, setcity] = useState('')
  const [address, setaddress] = useState('')
  const [contact, setcontact] = useState('')
  const router=useRouter();
 const [error, seterror] = useState(false)
 const [passworderror, setPassworderror] = useState(false)

  const handlesignup=async()=>{
    // console.log(email,password,c_password,name,city,address,contact)  
    if(password!==c_password){
      setPassworderror(true)
      return false
    }
    else{
      setPassworderror(false)
    }
    
    if(!email||!password||!c_password||!name||!city||!address||!contact){
      seterror(true)
      return false

  }
  else{
    seterror(false)
  }
    let response=await fetch('http://localhost:3000/api/restaurant',{
      method:'POST',body:JSON.stringify({email,password,name,city,address,contact}) //we will not send c_password to the server
      })
      response=await response.json()
      console.log(response)
      if(response.success){
        console.log(response)
        const {result}=response
        delete result.password
        localStorage.setItem('restaurantuser',JSON.stringify(result))
        router.push('/restaurant/dashboard')
      }
    

  }
  return (
    <>
    <h3>Signup</h3>
   <div className=''>
    <div className='m-[10px]'>

    <input onChange={(e)=>setemail(e.target.value)} value={email} className='w-[200px] h-[30px]'  type="text" placeholder='Enter email id'/>
    </div>
    {
      error&& !email && <div className='text-red-500 font-bold'>This  field is mandatory</div>
    }
    <div className='m-[10px] '>

    <input onChange={(e)=>setpassword(e.target.value)} value={password} className='w-[200px] h-[30px]'  type="password" placeholder='Enter password'/>
    </div>
    {
      passworderror&&<div className='text-red-500 font-bold'>Password and confirm password must be same</div>
    }
     {
      error&& !contact && <div className='text-red-500 font-bold'>This  field is mandatory</div>
    }
    <div className='m-[10px] '>

    <input onChange={(e)=>setc_password(e.target.value)} value={c_password} className='w-[200px] h-[30px]'  type="password" placeholder='Confirm Password'/>
    </div>
    {
      passworderror&&<div className='text-red-500 font-bold'>Password and confirm password must be same</div>
    }
    <div className='m-[10px] '>

    <input onChange={(e)=>setname(e.target.value)} value={name} className='w-[200px] h-[30px]'  type="text" placeholder='Enter restaurant name'/>
    </div>
    {
      error&& !name && <div className='text-red-500 font-bold'>This  field is mandatory</div>
    }
    <div className='m-[10px] '>

    <input onChange={(e)=>setcity(e.target.value)} value={city} className='w-[200px] h-[30px]'  type="text" placeholder='Enter city'/>
    </div>
    {
      error&& !city && <div className='text-red-500 font-bold'>This  field is mandatory</div>
    }
    <div className='m-[10px] '>

    <input onChange={(e)=>setaddress(e.target.value)} value={address} className='w-[200px] h-[30px]'  type="text" placeholder='Enter full address'/>
    </div>
    {
      error&& !address && <div className='text-red-500 font-bold'>This  field is mandatory</div>
    }
    <div className='m-[10px] '>

    <input onChange={(e)=>setcontact(e.target.value)} value={contact} className='w-[200px] h-[30px]'  type="text" placeholder='Enter contact number'/>
    </div>
    {
      error&& !contact && <div className='text-red-500 font-bold'>This  field is mandatory</div>
    }
    <div className='m-[10px] '>
        <button onClick={handlesignup} className='w-[200px] h-[30px] rounded-lg border border-blue-200 bg-blue-50' >Sign up</button>
    </div>
   </div>
    </>
  )
}

export default Signup
