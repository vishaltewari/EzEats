'use client'
import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
const Deliveryheader = ({loginstatus}) => {
  const router=useRouter()
   const logout=()=>{
    localStorage.removeItem('delivery')
    router.push('/deliverypartner')
   }
  return (  
    <div className="bg-gray-800 text-white">
        
      <div className="container mx-auto flex justify-between items-center h-16 p-3">
        <img
          className="h-12 rounded-lg"
          src="/logo1.jpeg"
          alt="logo"
        />
        <ul className="flex space-x-6">
        
        {loginstatus && (
            <>
              <li className="hover:text-gray-400">
                <Link href="/profile">Profile</Link>
              </li>
              <li className="hover:text-gray-400">
                <Link href="/">Home</Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  type="button"
                  className="text-white h-[80%] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Deliveryheader;