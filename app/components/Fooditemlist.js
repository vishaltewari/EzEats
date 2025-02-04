import { useRouter } from 'next/navigation';
import React from 'react';
import { useEffect,useState } from 'react';
const Fooditemlist = () => {
const [fooditems, setfooditems] = useState()
const router=useRouter()
  useEffect(() => {
    loadfooditems()
  
    
  }, [])
  const loadfooditems=async()=>{
    const restodata=JSON.parse(localStorage.getItem("restaurantuser"))
    // console.log(restodata)
    const resto_id=restodata._id
    let response=await fetch("http://localhost:3000/api/restaurant/foods/"+resto_id) //fetch food of specific id logged in
    response=await response.json()
    if(response.success){
      // console.log(response)
      setfooditems(response.result)
    }
    else{
      alert("Food item not found")
    }
  }
  const deletefooditems=async(id)=>{
    let response=await fetch("http://localhost:3000/api/restaurant/foods/"+id,{
      method:"DELETE"
    })
    response=await response.json()
    if(response.success){
      loadfooditems()
    }else{
      alert("Food item not found")
    }


  }
  return (
    
    <div className="p-6">
      <h1 className="text-center text-2xl font-bold mb-6">Food Items</h1>
      <table className="w-1/2 bg-blue-300 border border-gray-200 " >
        <thead>
          <tr>
            <th className="border py-2 px-4 border-b">S.No</th>
            <th className="border py-2 px-4 border-b">Name</th>
            <th className="border py-2 px-4 border-b">Price</th>
            <th className="border py-2 px-4 border-b">Description</th>
            <th className="border py-2 px-4 border-b">Image</th>
            <th className="border py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
        {fooditems && fooditems.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border border-gray-300">{index + 1}</td>
                <td className="py-2 px-4 border border-gray-300">{item.name}</td>
                <td className="py-2 px-4 border border-gray-300">{item.price}</td>
                <td className="py-2 px-4 border border-gray-300">{item.description}</td>
                <td className="py-2 px-4 border border-gray-300"><img className='w-[80px]' src={item.img_path} alt={item.name} /> </td>
                <td className="py-2 px-4 border border-gray-300">
                  <button onClick={()=>router.push('dashboard/'+item._id)} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">Edit</button>
                  <button onClick={()=>{deletefooditems(item._id)}} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fooditemlist;