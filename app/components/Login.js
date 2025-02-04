import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Login = () => {
  const [email, setemail] = useState()
 const [password, setPassword] = useState()
 const [error, seterror] = useState(false)
 const router=useRouter();
const handlelogin=async() => {
  if(!email||!password){  
    seterror(true)
    return false
  }
  else{
    seterror(false)
  }
  //  console.log(email,password)
  let response=await fetch('http://localhost:3000/api/restaurant',{
    method:'POST',body:JSON.stringify({email,password,login:true})
  })
  response=await response.json()
  if(response.success){
  alert('Login success')
  const {result}=response
  delete result.password
  localStorage.setItem('restaurantuser',JSON.stringify(result))
    router.push('/restaurant/dashboard')
  }else{
    alert('Login failed')
  }
 }
 
  return (
   <>
   Login component
   <div >
    <div className='m-[10px]'>

    <input className='w-[200px] h-[30px]' value={email} onChange={(e)=>setemail(e.target.value)}  type="text" placeholder='Enter email id'/>
    </div>
    {
      error&& !email && <div className='text-red-500 font-bold'>This  field is mandatory</div>
    }
    <div className='m-[10px] '>

    <input className='w-[200px] h-[30px]' value={password} onChange={(e)=>setPassword(e.target.value)}  type="password" placeholder='Enter password'/>
    </div>
    {
      error&& !password && <div className='text-red-500 font-bold'>This  field is mandatory</div>
    }
    <div className='m-[10px] '>
        <button onClick={handlelogin} className='w-[200px] h-[30px] border border-red-200 bg-red-50' >Login</button>
    </div>
   </div>
   </>
  )
}

export default Login
