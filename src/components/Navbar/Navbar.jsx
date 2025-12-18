import React, { useContext, useState } from 'react';
import style from './Navbar.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {
  const [isopen, setIsopen] = useState(false);
  let { count, userToken, setUserToken } = useContext(UserContext);
  let { cart } = useContext(CartContext);
  let navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login');
  }

  return (
    <>
      <header className="fixed inset-x-0 bg-pink-200 top-0 z-50">
        <nav className="flex items-center justify-between px-6 py-3 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="text-black"><i className="fa-solid fa-cart-shopping px-2"></i>FreshCart</span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button onClick={() => setIsopen(true)} type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Open main menu</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          {userToken && (
            <div className="hidden lg:flex lg:gap-x-12">
              <NavLink to={'Home'} className="text-sm/6 font-semibold text-gray-900">Home</NavLink>
              <NavLink to={'Cart'} className="text-sm/6 font-semibold text-gray-900">
                Cart{cart && cart.numOfCartItems ? cart.numOfCartItems : ''}
              </NavLink>
             
              <NavLink to={'Products'} className="text-sm/6 font-semibold text-gray-900">Products</NavLink>
              <NavLink to={'Categories'} className="text-sm/6 font-semibold text-gray-900">Categories</NavLink>
              <NavLink to={'Brands'} className="text-sm/6 font-semibold text-gray-900">Brands</NavLink>
             
            </div>
          )}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {userToken ? (
              <span onClick={() => logout()} className="text-sm/6 font-semibold text-gray-900">
                Log out <span aria-hidden="true"></span>
              </span>
            ) : (
              <>
                <NavLink to={''} className="text-sm/6 font-semibold text-gray-900 pe-2">register <span aria-hidden="true"></span></NavLink>
                <NavLink to={'login'} className="text-sm/6 font-semibold text-gray-900 ps-2">Log in <span aria-hidden="true"></span></NavLink>
              </>
            )}
          </div>
        </nav>
        <div className={isopen ? 'lg:hidden' : 'hidden'} role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="text-black"><i className="fa-solid fa-cart-shopping px-2"></i></span>
              </a>
              <button onClick={() => setIsopen(false)} type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
                <span className="sr-only">Close menu</span>
                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6 flex flex-col">
                  <NavLink to={'Home'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Home</NavLink>
                  <NavLink to={'Cart'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 pl-1">
                    Cart{cart ? <span className='text-pink-500 pr-1.5 '>{cart.numOfCartItems}</span> : <span className='text-pink-500 pl-0.5'>0</span>}
                  </NavLink>
                 
                  <NavLink to={'Products'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Products</NavLink>
                  <NavLink to={'Categories'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Categories</NavLink>
                  <NavLink to={'Brands'} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Brands</NavLink>
                  
                </div>
                <div className="py-6">
                  <NavLink to={''} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">register</NavLink>
                  <NavLink to={'login'} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Log in</NavLink>
                  <span onClick={() => logout()} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Log out</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
