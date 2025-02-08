'use client';
import React, { useState, useEffect } from 'react';
import Customerheader from '../components/Customerheader';
import Footer from '../components/Footer';
import { DELIVERY_CHARGES, TAX } from '../lib/constant';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const router = useRouter();
  const [userstorage, setUserStorage] = useState(null);
  const [cartstorage, setCartStorage] = useState([]);
  const [total, setTotal] = useState(0);
  const [removecartdata, setRemoveCartData] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user'));
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setUserStorage(user);
      setCartStorage(cart);
      setTotal(cart.length === 1 ? cart[0].price : cart.reduce((a, b) => a.price + b.price, 0));
    }
  }, []);

  useEffect(() => {
    if (total > 0) {
      router.push('/order');
    }
  }, [total]);

  const ordernow = async () => {
    if (typeof window !== 'undefined') {
      let user_id = JSON.parse(localStorage.getItem('user'))._id;
      // Your order logic here
    }
  };

  const handleremovecart = (id) => {
    const updatedCart = cartstorage.filter(item => item._id !== id);
    setCartStorage(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setTotal(updatedCart.length === 1 ? updatedCart[0].price : updatedCart.reduce((a, b) => a.price + b.price, 0));
  };

  return (
    <div>
      <Customerheader />
      <div className='fooditemswrapper mt-[50px] mb-[50px]'>
        {cartstorage.length > 0 ? (
          cartstorage.map((item, index) => (
            <div className='listitem text-orange-500 border border-orange-500 p-[20px] flex capitalize gap-3' key={index}>
              <div className='block1 w-[20%]'>
                <img className='w-[150px] pr-[20px]' src={item.img_path} alt='item_img' />
              </div>
              <div className='block2 w-[60%]'>
                <div>{item.name}</div>
                <div className='description'>{item.description}</div>
                <button
                  onClick={() => handleremovecart(item._id)}
                  className='text-black border-none bg-orange-500 p-[5px] rounded-md cursor-pointer'
                >
                  Remove from cart
                </button>
              </div>
              <div className='block3 w-[20%] font-bold'>Price : Rs.{item.price}</div>
            </div>
          ))
        ) : (
          <h1 className='text-center text-2xl'>No food items available</h1>
        )}
      </div>
      <div className='totalprice flex flex-col items-center border p-[20px]'>
        <div className='totalpriceinfo flex justify-between w-full max-w-[400px] font-bold text-orange-500'>
          <span className='w-[150px] text-right'>Item charges:</span>
          <span className='w-[150px] text-left'>{total}</span>
        </div>
        <div className='totalpriceinfo flex justify-between w-full max-w-[400px] font-bold text-orange-500'>
          <span className='w-[150px] text-right'>Tax Price:</span>
          <span className='w-[150px] text-left'>{total * 10 / 100}</span>
        </div>
        <div className='totalpriceinfo flex justify-between w-full max-w-[400px] font-bold text-orange-500'>
          <span className='w-[150px] text-right'>Delivery Charges:</span>
          <span className='w-[150px] text-left'>{100}</span>
        </div>
        <div className='totalpriceinfo flex justify-between w-full max-w-[400px] font-bold text-orange-500'>
          <span className='w-[150px] text-right'>Total Amount:</span>
          <span className='w-[150px] text-left'>{total + (total * 10 / 100) + 100}</span>
        </div>
      </div>
      <div className='flex justify-center'>
        <button
          onClick={ordernow}
          className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-black rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'
        >
          <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-[#f5f5dc] rounded-md group-hover:bg-opacity-0'>
            Order Now
          </span>
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
