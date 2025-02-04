"use client"
import Customerheader from '@/app/components/Customerheader'
import Footer from '@/app/components/Footer'
import { useSearchParams } from 'next/navigation'

import React from 'react'
import { useEffect,useState } from 'react'
const Page = (props) => {
    const [restaurantdetails, setrestaurantdetails] = useState()
    const [fooditems, setFooditems] = useState([])
    const [cartdata, setcartdata] = useState()
    const [cartstorage, setcartstorage] = useState(JSON.parse(localStorage.getItem('cart')))
    const [cartid, setcartid] = useState(cartstorage?()=>cartstorage.map((item)=>{return item._id}):[])
    const [removecartdata, setremovecartdata] = useState()
    const searchParams=useSearchParams()
    const name=  props.params.name
    useEffect(() => {
      loadrestaurantdetails()
      
    
     }, [])
    //  console.log(cartid)

    const loadrestaurantdetails=async()=>{
        const id=searchParams.get('id')
        // console.log(id)
    let response= await fetch("/api/customer/"+id)
    response=await response.json()
    if(response.success){
        setrestaurantdetails(response.details)
        setFooditems(response.fooditems)
    }
    }
    const addtocart=(item) => {
      setcartdata(item)
      let localcartid=cartid
      localcartid.push(item._id)
      setcartid(localcartid)
      setremovecartdata()
    }
    const handleremovecart=(id) => {
      setremovecartdata(id)
      var localids=cartid.filter((item)=>item!==id)
      setcartdata()
      setcartid(localids)
    }
    
    return (

        <div>
            <Customerheader cartdata={cartdata} removecartdata={removecartdata}/>  
            {/* passing data to header after cart button is clicked above */}
            <div className="bg-[url('https://w7.pngwing.com/pngs/736/269/png-transparent-food-background-food-fruit-gray-thumbnail.png')]  p-[30px] h-[175px] text-white text-center ">
                <h1 className=" m-auto text-3xl font-bold mb-10">{decodeURI(name)}</h1>
             
            </div>
            <div className='detailwrapper flex bg-orange-500 '>           
                    <h3 className='w-[50%]'>Contact: {restaurantdetails?.contact}</h3>
                    <h3 className='w-[50%]'>City: {restaurantdetails?.city}</h3>
                    <h3 className='w-[50%]'>Address: {restaurantdetails?.address}</h3> 
                    <h3 className='w-[50%]'>Email: {restaurantdetails?.email}</h3> 
            </div>
            <h1>
                
            </h1>

            <div className='fooditemswrapper mt-[50px] mb-[50px]'>
                {
                    fooditems.length>0?fooditems.map((item,index)=>(
                        <div className='listitem text-orange-500  border border-orange-500 p-[20px] flex capitalize gap-3' key={index}>
                            <div><img className='w-[150px] pr-[20px]' src={item.img_path} alt="item_img" /></div>
                            <div>

                            <div>{item.name}</div>
                            <div>{item.price}</div>
                            <div className='description '>{item.description}</div>
                            {
                                cartid.includes(item._id)?<button onClick={()=>handleremovecart(item._id)} className=' text-black border-none bg-orange-500 p-[5px] rounded-md cursor-pointer'>Remove from cart</button>: <button onClick={()=>addtocart(item)} className=' text-black border-none bg-orange-500 p-[5px] rounded-md cursor-pointer'>Add to cart</button>
                            }
                            
                           
                            </div>
                        </div>
                    )):
                    <h1 className='text-center text-2xl'>No food items available</h1>
                }
            </div>
            <Footer/>
        </div>
    )
}

export default Page
