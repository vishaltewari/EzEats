"use client"
import Image from "next/image";
import Customerheader from "./components/Customerheader";
import Footer from "./components/Footer";
import { useEffect,useState } from "react";
import { AfterContext } from "next/dist/server/after/after-context";
import { ACTION_NAVIGATE } from "next/dist/client/components/router-reducer/router-reducer-types";
import { useRouter } from "next/navigation";
export default function Home() {
  const [locations, setlocations] = useState([])
  const [selectedlocation, setselectedlocation] = useState('')
  const [showlocation, setshowlocation] = useState(false)
  const [restaurants, setrestaurants] = useState([])
  const router=useRouter()
  const loadlocations=async()=>{
    const res=await fetch("/api/customer/locations")
    const data=await res.json()
    // console.log(data)
    if(data.success){
      setlocations(data.result)
    }
  }
  const loadrestaurants=async(params)=>{
    let url='/api/customer/'
    if(params?.location){
      url=url+"?location="+params.location
    }
    else if(params?.restaurant){
      url=url+"?restaurant="+params.restaurant
    
    }
    else{

    }
    let response=await fetch(url)
    response=await response.json()
    if(response.success){
      setrestaurants(response.result)
    }

  }
useEffect(() => {
    
    loadlocations()
    loadrestaurants()
},[])

const handlelistitem=(item)=>{
  setselectedlocation(item)
  setshowlocation(false)
  loadrestaurants({location:item})
} 
console.log(restaurants)
  return (
  <main>
    <Customerheader/>
    <div className="bg-[url('https://w7.pngwing.com/pngs/736/269/png-transparent-food-background-food-fruit-gray-thumbnail.png')]  p-[30px] h-[175px] text-white text-center ">
      <h1 className=" m-auto text-2xl font-bold mb-10">EzEats-Food Delivery App</h1>
      <div  className=" bg-white rounded-lg p-[5px] m-auto w-[70%]">
        <input onClick={()=>{setshowlocation(true)}} value={selectedlocation} className="h-[40px] text-black border-none outline-none w-[200px] " type="text" placeholder="Select City" />
        <ul className=" text-black list-none absolute bg-white p-0 m-0  ml-[-5px] border border-[#ccc]">
        
        {showlocation && locations.map((item,index)=>(
            <li key={index} onClick={()=>handlelistitem(item)} className="w-[180px] p-[5px] border border-black cursor-pointer">{ item}</li>
          ))
        }
        </ul>
        <input onChange={(e)=>loadrestaurants({restaurant:e.target.value})} className="text-black border-l-2 border-blue-300 p-1 outline-none w-[65%] h-[40px]" type="text" placeholder="Enter food or restaurant name" />

      </div>
    </div>
    <div className="restaurantlistcontainer flex flex-row flex-wrap mt-[40px] mb-[50px] ">

    {
      restaurants.map((item,index)=>(
        <div onClick={()=>{[router.push('/explore/'+item.name+"?id="+item._id)]}} key={index} className="w-[45%] bg-orange-500 m-[10px] p-[10px] border border-[#aaa] rounded-md cursor-pointer">
          <div className="pl-[14px] flex justify-start gap-2">
          <h3 className="text-bold  text-xl">{item.name}</h3>
          <h5 className="text-md">Contact : {item.contact}</h5>
          </div>
          <div className="pl-[14px] flex justify-start gap-2">
            <div>{item.city}</div>
            <div>{item.address}, Email : {item.email}</div>
          </div>
          </div>
      ))
    }
    </div>
    <Footer/>
  </main>

  );
}
