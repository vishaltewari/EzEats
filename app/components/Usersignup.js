import { useRouter } from 'next/navigation'
import React from 'react'
import { useState } from 'react'
const Usersignup = () => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [cpassword, setcpassword] = useState('')
    const [address, setaddress] = useState('')
    const [contact, setcontact] = useState('')
    const [city, setcity] = useState('')
    const router=useRouter()
    const handlesignup = async() => {
        console.log(name, email, password, cpassword, address, contact, city)
        let response=await fetch('/api/user',{
            method:'POST',
            body:JSON.stringify({name,email,password,address,contact,city})

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
        }
    }

    return (

        <div>
            <div className='inputcontainer m-6 '>

                <input type="text" onChange={(e) => setname(e.target.value)} value={name} className='h-[30px] p-[10px] rounded-lg w-[40%] hover:scale-[105%]' placeholder='Enter your  Name' />
            </div>
            <div className='inputcontainer m-6'>

                <input type="text" onChange={(e) => setemail(e.target.value)} value={email} className='h-[30px] p-[10px] rounded-lg w-[40%] hover:scale-[105%]' placeholder='Enter your  Email' />
            </div>
            <div className='inputcontainer m-6'>

                <input type="password" onChange={(e) => setpassword(e.target.value)} value={password} className='h-[30px] p-[10px] rounded-lg w-[40%] hover:scale-[105%]' placeholder='Set Password' />
            </div>
            <div className='inputcontainer m-6'>

                <input type="password" onChange={(e) => setcpassword(e.target.value)} value={cpassword} className='h-[30px] p-[10px] rounded-lg w-[40%] hover:scale-[105%]' placeholder='Confirm Password' />
            </div>
            <div className='inputcontainer m-6'>

                <input type="text" onChange={(e) => setcity(e.target.value)} value={city} className='h-[30px] p-[10px] rounded-lg w-[40%] hover:scale-[105%]' placeholder='Enter City' />
            </div>
            <div className='inputcontainer m-6'>

                <input type="text" onChange={(e) => setaddress(e.target.value)} value={address} className='h-[30px] p-[10px] rounded-lg w-[40%] hover:scale-[105%]' placeholder='Enter your address' />
            </div>
            <div className='inputcontainer m-6'>

                <input type="text" onChange={(e) => setcontact(e.target.value)} value={contact} className='h-[30px] p-[10px] rounded-lg w-[40%] hover:scale-[105%]' placeholder='Enter your phone number' />
            </div>
            <div className='btn'>
                <button onClick={handlesignup} className="relative  inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-black rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                    <span className=" text-black font-bold relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-[#f5f5dc] rounded-md group-hover:bg-opacity-0">
                        Confirm
                    </span>
                </button>
            </div>

        </div>
    )
}

export default Usersignup
