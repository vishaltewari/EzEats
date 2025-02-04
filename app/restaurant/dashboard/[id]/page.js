"use client"
import React from 'react'
import { useState ,useEffect} from 'react'
import { useRouter } from 'next/navigation'
const Editfooditem = (props) => {
    const [name, setname] = useState("")
    const [price, setprice] = useState("")
    const [path, setpath] = useState("")
    const [description, setdescription] = useState("")
    const [error, seterror] = useState(false)
    const router=useRouter()
    useEffect(() => {
        handleloadfooditem()
    },[])
    const handleloadfooditem=async()=>{
        const params = await props.params;
        const { id } = params;
        let response = await fetch(`/api/restaurant/foods/edit/${id}`);
        response=await response.json()
         if(response.success){
            console.log(response.result)
            setname(response.result.name)
            setprice(response.result.price)
            setpath(response.result.img_path)
            setdescription(response.result.description)
            
         }
    }
    const handleeditfooditem=async() => {
    //   console.log(name,price,path,description)
    const restaurantdata=JSON.parse(localStorage.getItem('restaurantuser')) //to fetch resaurant id from localstorage
    if(!name||!price||!path||!description){
        seterror(true)
        return false
    }
    else{
        seterror(false)
    }
    const params = await props.params;
    const  id  = params.id;
    let response = await fetch('/api/restaurant/foods/edit/'+id, {
        method: 'PUT',
        body:JSON.stringify({name,price,img_path:path,description,restaurant_id:restaurantdata._id}),
    });
    response=await response.json()
    if(response.success){
        
        router.push('../dashboard')
   
    }
}
    
    return (
        <div className='container text-center'>
            <h1>Edit food item</h1>
            <div className='m-[10px]'>

                <input className='w-[200px] h-[30px]' onChange={(e) => { setname(e.target.value) }} value={name} type="text" placeholder='Enter food name' />
            </div>
            {error&& !name && <div className='text-red-500 font-bold'>This  field is mandatory</div>}
            <div className='m-[10px]'>

                <input className='w-[200px] h-[30px]' onChange={(e) => { setprice(e.target.value) }} value={price} type="text" placeholder='Enter price' />
            </div>
            {error&& !price && <div className='text-red-500 font-bold'>This  field is mandatory</div>}
            <div className='m-[10px]'>

                <input className='w-[200px] h-[30px]' onChange={(e) => { setpath(e.target.value) }} value={path} type="text" placeholder='Enter image path' />
            </div>
            {error&& !path && <div className='text-red-500 font-bold'>This  field is mandatory</div>}
            <div className='m-[10px]'>

                <input className='w-[200px] h-[30px]' onChange={(e) => { setdescription(e.target.value) }} value={description} type="text" placeholder='Enter its description' />
            </div>
            {error&& !description && <div className='text-red-500 font-bold'>This  field is mandatory</div>}
            <div className='m-[10px]'>

                <button onClick={handleeditfooditem} className='w-[200px] h-[30px] border border-red-200 bg-red-50'>Update food item</button>
            </div>
            <div className='m-[10px]'>

                <button onClick={()=>router.push('../dashboard')} className='w-[200px] h-[30px] border border-red-200 bg-red-50'>Back to food item List</button>
            </div>
        </div>
    )
}

export default Editfooditem
