'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Customerheader = (props) => {
  const [user, setUser] = useState(undefined);
  const [cartNumber, setCartNumber] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userStorage = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
      const cartStorage = localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart'));
      setUser(userStorage ? userStorage : undefined);
      setCartNumber(cartStorage?.length || 0);
      setCartItem(cartStorage || []);
    }
  }, []);

  useEffect(() => {
    if (props.cartdata) {
      if (cartNumber) {
        if (cartItem[0].resto_id !== props.cartdata.resto_id) {
          localStorage.removeItem('cart');
          setCartNumber(1);
          setCartItem([props.cartdata]);
          localStorage.setItem('cart', JSON.stringify([props.cartdata]));
        } else {
          setCartNumber(cartNumber + 1);
          setCartItem([...cartItem, props.cartdata]);
          localStorage.setItem('cart', JSON.stringify([...cartItem, props.cartdata]));
        }
      } else {
        setCartNumber(1);
        setCartItem([props.cartdata]);
        localStorage.setItem('cart', JSON.stringify([props.cartdata]));
      }
    }
  }, [props.cartdata]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(undefined);
    router.push('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        Food Delivery
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/menu">Menu</Link>
          </li>
          <li>
            <Link href="/cart">Cart ({cartNumber})</Link>
          </li>
          {user ? (
            <>
              <li>
                <span>Welcome, {user.name}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="text-red-500">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Customerheader;
