'use client'
import React from 'react'
import { useState,useEffect } from 'react'
import Customerheader from '../components/Customerheader'
import Footer from '../components/Footer'
import { DELIVERY_CHARGES, TAX } from '../lib/constant'
import { useRouter } from 'next/navigation'
const cart = () => {
    const [userstorage, setuserstorage] = useState(JSON.parse(localStorage.getItem('user')))
    const [cartstorage, setcartstorage] = useState(JSON.parse(localStorage.getItem('cart')))
    const [total, settotal] = useState(() =>
        cartstorage?.length == 1 ? cartstorage[0].price : cartstorage?.reduce((a, b) => {
            return a.price + b.price
        }))
    console.log(total)
    useEffect(() => {
      if(total>0){
        router.push('/order')

      }
    }, [total])
    
    const [removecartdata, setremovecartdata] = useState(false)
    const router=useRouter()
    const ordernow=async() => {
      let user_id=JSON.parse(localStorage.getItem('user'))._id
      let city=JSON.parse(localStorage.getItem('user')).city
      let cart=JSON.parse(localStorage.getItem('cart'))
      let fooditemids=cart.map((item)=>item._id).toString()
      let partnerresponse=await fetch('http://localhost:3000/api/deliverpartners/'+city)
      partnerresponse=await partnerresponse.json()
    //   console.log(partnerresponse)
       let  deliverypartner_id=partnerresponse.result.map((item)=>item._id)
       let deliverypartner_id1=deliverypartner_id[Math.floor(Math.random()*deliverypartner_id.length)]
        console.log(deliverypartner_id1)
        return false
        if(!deliverypartner_id1){
            alert("No delivery partner available right now! Please try again later")
        }
    //   return false
    //   let deliverypartner_id='60b9b3b3b3b3b3b3b3b3b3b3'  
      let status='confirm'
      let resto_id=cart[0].resto_id

      let collection={
         user_id,
         fooditemids,
         resto_id,
         deliverypartner_id,
         status,
         amount:total,

      }
    //   console.log(collection)   
    let response=await fetch('http://localhost:3000/api/order',{
        method:'POST',
        body:JSON.stringify(collection)
    })
    response=await response.json()
    if(response.success){
        alert('Order Placed Successfully')
        setremovecartdata(true)
        router.push('myprofile')
    }else{
        alert('Order Failed')
    }
    }
    
    return (
        <div>
            <Customerheader removecartdata={removecartdata} />
            <div className='totalprice flex flex-col items-center flex-wrap border p-[20px]'>
               <h2 className='font-bold'>User Details</h2>
                <div className='totalpriceinfo flex justify-between w-full max-w-[400px] font-bold text-orange-500'>
                    <span className='w-[150px]'>Name</span>
                    <span className='w-[150px]'>{userstorage.name}</span>
                </div>
                <div className='totalpriceinfo flex justify-between w-full max-w-[400px] font-bold text-orange-500'>
                    <span className='w-[150px]'>Address</span>
                    <span className='w-[150px]'>{userstorage.address}</span>
                </div>
                <div className='totalpriceinfo flex justify-between w-full max-w-[400px] font-bold text-orange-500'>
                    <span className='w-[150px]'>Contact</span>
                    <span className='w-[150px]'>{userstorage.contact}</span>
                </div>
                <h2 className='font-bold'>Amount Details</h2>
                <div className='totalpriceinfo flex justify-between w-full max-w-[400px] font-bold text-orange-500'>
                    <span className='w-[150px]'>Item charges:</span>
                    <span className='w-[150px]'>{total}</span>
                </div>
                <div className='totalpriceinfo flex justify-between w-full max-w-[400px] font-bold text-orange-500'>
                    <span className='w-[150px]'>Tax Price:</span>
                    <span className='w-[150px]'>{total * TAX / 100}</span>
                </div>
                <div className='totalpriceinfo flex justify-between w-full max-w-[400px] font-bold text-orange-500'>
                    <span className='w-[150px]'>Delivery Charges:</span>
                    <span className='w-[150px]'>{DELIVERY_CHARGES}</span>
                </div>
                <div className='totalpriceinfo flex justify-between w-full max-w-[400px] font-bold text-orange-500'>
                    <span className='w-[150px]'>Total Amount:</span>
                    <span className='w-[150px]'>{total + (total * TAX / 100) + DELIVERY_CHARGES}</span>
                </div>
                <h2 className='font-bold '>Payment Methods</h2>
                <div className='totalpriceinfo flex justify-between w-full max-w-[400px] font-bold text-orange-500'>
                    <span className='w-[150px]'>Cash On Delivery</span>
                    <span className='w-[150px]'>{total + (total * TAX / 100) + DELIVERY_CHARGES}</span>
                </div>
            </div>          
            <div className='flex justify-center mr-12'>
                <button onClick={ordernow} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-black rounded-lg group bg-gradient-to-br from-pink-500  to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                    <span className="relative  px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-[#f5f5dc] rounded-md group-hover:bg-opacity-0">
                        Proceed
                    </span>  
                </button>
            </div>
            <Footer />
        </div>

    )
}

export default cart
