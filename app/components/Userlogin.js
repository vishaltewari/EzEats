import { useRouter } from 'next/navigation'
import React, { use } from 'react'
import { useState } from 'react'

const Userlogin = (props) => {
  const router=useRouter()
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const handlelogin=async() => {
      // console.log(email,password)
      let response=await fetch('/api/user/login',{
        method:'POST',
        body:JSON.stringify({email,password})

    })
    response=await response.json()
    if(response.success){
        const {result}=response
        delete result.password
        localStorage.setItem('user',JSON.stringify(result))
        if(props.redirect?.order){
          router.push('/order')
        }else{

          router.push('/')
        }
    }else{
      alert("Invalid email or password.Please Try Again")
    }
    }
    
  return (
    
    <div>
      <div className="inputcontainer m-6">
        <input onChange={(e)=>setemail(e.target.value)} value={email} className='h-[30px] p-[10px] rounded-lg w-[30%] hover:scale-[105%]' type="text" placeholder='Enter Email' />
        
      </div>
      <div className="inputcontainer m-6">
        <input onChange={(e)=>setpassword(e.target.value)} value={password} className='h-[30px] p-[10px] rounded-lg w-[30%] hover:scale-[105%]' type="password" placeholder='Enter password' />
        
      </div>
      <div className="inputcontainer m-6">
      <button onClick={handlelogin} className="relative  inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-black rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                    <span className=" text-black font-bold relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-[#f5f5dc] rounded-md group-hover:bg-opacity-0">
                        Login
                    </span>
                </button>
        
      </div>
    </div>
  )
}

export default Userlogin
