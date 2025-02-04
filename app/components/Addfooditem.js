import React from 'react'
import { useState } from 'react'
const Addfooditem = (props) => {
    const [name, setname] = useState("")
    const [price, setprice] = useState("")
    const [path, setpath] = useState("")
    const [description, setdescription] = useState("")
    const [error, seterror] = useState(false)
    const handleadditem=async() => {
    //   console.log(name,price,path,description)
    const restaurantdata=JSON.parse(localStorage.getItem('restaurantuser')) //to fetch resaurant id from localstorage
    if(!name||!price||!path||!description){
        seterror(true)
        return false
    }
    else{
        seterror(false)
    }
    let resto_id
    if(restaurantdata){                 
        resto_id=restaurantdata._id
    }
    let response=await fetch('http://localhost:3000/api/restaurant/foods',{
        method:'POST',body:JSON.stringify({name,price,img_path:path,description,resto_id})
    })
    response=await response.json()
    if(response){
        alert("Food Item added")
        setname("")
        setprice("")
        setpath("")
        setdescription("")              
        props.setadditem(false)
    }
    else{               
        alert("Food Item not added")
    }
    }
    
    return (
        <div className='container text-center'>
            <h1>Add your new food item</h1>
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

                <button onClick={handleadditem} className='w-[200px] h-[30px] border border-red-200 bg-red-50'>Add food item</button>
            </div>  
        </div>
    )
}

export default Addfooditem
