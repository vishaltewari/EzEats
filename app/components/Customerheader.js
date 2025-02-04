import Link from 'next/link';
import { useState, useEffect } from 'react';
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
          let localCartItem = cartItem;
          localCartItem.push(props.cartdata);
          setCartNumber(cartNumber + 1);
          localStorage.setItem('cart', JSON.stringify(localCartItem));
        }
      } else {
        setCartItem([props.cartdata]);
        setCartNumber(1);
        localStorage.setItem('cart', JSON.stringify([props.cartdata]));
      }
    }
  }, [props.cartdata]);

  useEffect(() => {
    if (props.removecartdata) {
      let localCartItems = cartItem.filter((item) => item._id !== props.removecartdata);
      setCartItem(localCartItems);
      setCartNumber(cartNumber - 1);
      localStorage.setItem('cart', JSON.stringify(localCartItems));
    }
  }, [props.removecartdata]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(undefined);
    router.push('/usersign');
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
              <Link href="/usersign">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Customerheader;
