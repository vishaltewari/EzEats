'use client'
import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
const Customerheader = (props) => {
  const userstorage = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))  
  const [user, setuser] = useState(userstorage ? userstorage : undefined)
  const cartstorage =localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart'))
  const [cartnumber, setcartnumber] = useState(cartstorage?.length)
  const [cartitem, setcartitem] = useState(cartstorage)
  // console.log(props.cartdata);
  const router=useRouter()
  useEffect(() => {
    if (props.cartdata) {

      if (cartnumber) {
        if (cartitem[0].resto_id != props.cartdata.resto_id) {
          localStorage.removeItem('cart')
          setcartnumber(1)
          setcartitem(JSON.parse(JSON.stringify(props.cartdata)))
          localStorage.setItem('cart', JSON.stringify([props.cartdata]))
        } else {

          let localcartitem = cartitem
          localcartitem.push(props.cartdata)
          setcartnumber(cartnumber + 1)
          setcartitem(localcartitem)
          localStorage.setItem('cart', JSON.stringify(localcartitem))
        }
      } else {

        setcartitem(JSON.parse(JSON.stringify(props.cartdata)))
        localStorage.setItem('cart', JSON.stringify([props.cartdata]))

      }
    }
  }, [props.cartdata]);
  useEffect(() => {
    if (props.removecartdata) {
      let localcartitems = cartitem.filter((item) => {
        item._id !== props.removecartdata

        return item._id !== props.removecartdata
      })
      setcartitem(localcartitems)
      setcartnumber(cartnumber - 1)
      localStorage.setItem('cart', JSON.stringify(localcartitems))
    }

  }, [props.removecartdata]);
  useEffect(() => {
   if(props.removecartdata){
    setcartitem([])
    setcartnumber(0)
    localStorage.removeItem('cart')
   }
  }, [props.removecartdata])
  
const logout=()=>{
  localStorage.removeItem('user')
  setuser(undefined)
  router.push('http://localhost:3000/usersign')
}
  return (
    <div className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center h-16 p-3">
        <img
          className="h-12 rounded-lg"
          src="\logo1.jpeg"
          alt="logo"
        />
        <ul className="flex space-x-6">
          <li className="hover:text-gray-400">
            <Link href="/">Home</Link>
          </li>
          {
            user ?
              <>
                <li className="hover:text-gray-400">
                  <Link className='text-orange-300' href="/myprofile">Welcome,{user?.name}</Link>
                </li>
                  <li><button onClick={logout} type="button" className="text-white h-[80%] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Logout</button>
                  </li>
              </>
              :
              <>

                <li className="hover:text-gray-400">
                  <Link href="/">Login</Link>
                </li>
                <li className="hover:text-gray-400">
                  <Link href="/">Signup</Link>
                </li>
              </>
          }
          <li className="hover:text-gray-400">
            <Link href={cartnumber ? "/cart" : "#"}>Cart({cartnumber ? cartnumber : 0})</Link>
          </li>
          <li className="hover:text-gray-400">
            <Link href="/">Add Restaurant</Link>
          </li>
          <li className="hover:text-gray-400">
            <Link href="/deliverypartner">Delivery Partner</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Customerheader;