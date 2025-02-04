'use client'
import React from 'react'
import { useState,useEffect } from 'react'
import Customerheader from '../components/Customerheader'
import Footer from '../components/Footer'
import { DELIVERY_CHARGES, TAX } from '../lib/constant'
import { useRouter } from 'next/navigation'

const cart = () => {
    const router=useRouter()
    const [cartstorage, setcartstorage] = useState(JSON.parse(localStorage.getItem('cart')))
    const [total, settotal] = useState(0)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        setcartstorage(cart);
        settotal(cart.length === 1 ? cart[0].price : cart.reduce((a, b) => a.price + b.price, 0));
      }, []);
    // console.log(total)
    const ordernow=() => {
        if(JSON.parse(localStorage.getItem('user'))){

            router.push('/order')
        }else{
            router.push('/usersign?order=true')
        }
    }
    
    return (
        <div>
            <Customerheader />
            <div className='fooditemswrapper mt-[50px] mb-[50px]'>
                {
                    cartstorage?.length > 0 ? cartstorage?.map((item, index) => (
                        <div className='listitem text-orange-500  border border-orange-500 p-[20px] flex capitalize gap-3' key={index}>
                            <div className='block1 w-[20%]'><img className='w-[150px] pr-[20px]' src={item.img_path} alt="item_img" /></div>
                            <div className='block2 w-[80%]'>

                                <div className=''>{item.name}</div>
                                <div className='description '>{item.description}</div>
                                {
                                    <button onClick={() => handleremovecart(item._id)} className=' text-black border-none bg-orange-500 p-[5px] rounded-md cursor-pointer'>Remove from cart</button>
                                }
                            </div>
                            <div className='block3 w-[20%] font-bold'>Price : Rs.{item.price}</div>
                        </div>
                    )) :
                        <h1 className='text-center text-2xl'>No food items available</h1>
                }
            </div>
            <div className='totalprice flex flex-col items-center flex-wrap border p-[20px]'>
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
            </div>           
            <div className='flex justify-center mr-12'>

                <button onClick={ordernow} class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-black rounded-lg group bg-gradient-to-br from-pink-500  to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                    <span className="relative  px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-[#f5f5dc] rounded-md group-hover:bg-opacity-0">
                        Order Now
                    </span>
                </button>
            </div>
            <Footer />
        </div>

    )
}
export default cart
