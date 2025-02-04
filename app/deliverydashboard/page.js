'use client'
import React from 'react'
import Deliveryheader from '../components/Deliveryheader'
import { useEffect,useState } from 'react'
import { useRouter } from 'next/navigation'
const page = () => {
  
  const router=useRouter()
  const [myorders, setmyorders] = useState([])
      
  const getmyorders=async() => {
    const deliverydata=JSON.parse(localStorage.getItem('delivery'))

      let response=await fetch('http://localhost:3000/api/deliverpartners/orders/6770f6b1ac9b97a4dd8f3a58')
      response=await response.json()
      if(response.success){
          setmyorders(response.result)
          
      }
  }
  useEffect(() => {
         getmyorders()
          const delivery=JSON.parse(localStorage.getItem('delivery'))
          if(!delivery){
              router.push('/deliverypartner')
          }
       }, [])
  return (
    <div>
      <Deliveryheader/>
      <h1 className='text-center font-bold text-2xl'>My Order List</h1>
      {
        myorders.map((item)=>(
            <div className='w-[45%] bg-orange-500 m-[10px] p-[10px] border border-[#aaa] rounded-md cursor-pointer ml-auto mr-auto'>
                <h4>Name: {item.data.name}</h4>
                <div>Amount: {item.amount}</div>
                <div>Address: {item.data.address}</div>
                <div>Status: {item.status}</div>
                <div>Update Status: <select>
                  <option>Confirm</option>
                  <option>On the Way</option>
                  <option>Delivered</option>
                  
                  </select></div>
                
            </div>
        ))
      }
    </div>
  )
}

export default page
