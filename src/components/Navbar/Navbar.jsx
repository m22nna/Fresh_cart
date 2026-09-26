import React, { useContext, useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { WishContext } from '../../Context/WishContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let { userToken, setUserToken } = useContext(UserContext);
  let { cart } = useContext(CartContext);
  let { wishlist } = useContext(WishContext);
  let navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login');
  }

  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold transition-all duration-200 px-3 py-2 rounded-xl flex items-center gap-1.5 ${
      isActive
        ? 'text-emerald-600 bg-emerald-50 font-bold'
        : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block rounded-xl px-4 py-2.5 text-base font-semibold transition-colors ${
      isActive
        ? 'text-emerald-600 bg-emerald-50 font-bold'
        : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-600'
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-18" aria-label="Global">
        
        {/* Brand Logo */}
        <div className="flex lg:flex-1">
          <Link to={userToken ? '/home' : '/login'} className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <i className="fa-solid fa-cart-shopping text-base"></i>
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              Fresh<span className="text-emerald-600">Cart</span>
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none transition-colors"
          >
            <span className="sr-only">Toggle navigation</span>
            {isOpen ? (
              <i className="fa-solid fa-xmark text-xl"></i>
            ) : (
              <i className="fa-solid fa-bars-staggered text-xl"></i>
            )}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        {userToken && (
          <div className="hidden lg:flex lg:gap-x-1 items-center">
            <NavLink to="/home" className={navLinkClass}>
              <i className="fa-solid fa-house text-xs opacity-70"></i>
              Home
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              <i className="fa-solid fa-store text-xs opacity-70"></i>
              Products
            </NavLink>
            <NavLink to="/categories" className={navLinkClass}>
              <i className="fa-solid fa-layer-group text-xs opacity-70"></i>
              Categories
            </NavLink>
            <NavLink to="/brands" className={navLinkClass}>
              <i className="fa-solid fa-award text-xs opacity-70"></i>
              Brands
            </NavLink>
            <NavLink to="/cart" className={navLinkClass}>
              <div className="relative flex items-center gap-1.5">
                <i className="fa-solid fa-basket-shopping text-xs opacity-70"></i>
                <span>Cart</span>
                {cart && cart.numOfCartItems > 0 && (
                  <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-emerald-600 rounded-full">
                    {cart.numOfCartItems}
                  </span>
                )}
              </div>
            </NavLink>
            <NavLink to="/wish" className={navLinkClass}>
              <div className="relative flex items-center gap-1.5">
                <i className="fa-solid fa-heart text-xs opacity-70"></i>
                <span>Wishlist</span>
                {wishlist && wishlist.length > 0 && (
                  <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-rose-500 rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </div>
            </NavLink>
          </div>
        )}

        {/* Auth / Action Buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-3">
          {userToken ? (
            <button
              onClick={logout}
              className="text-sm font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-arrow-right-from-bracket text-xs"></i>
              <span>Log out</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'text-emerald-600 bg-emerald-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-4.5 py-2 rounded-xl shadow-sm hover:shadow-emerald-500/20 active:scale-95 transition-all duration-200"
              >
                Sign In
              </NavLink>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl px-4 py-5 space-y-3 shadow-xl animate-fade-in">
          {userToken ? (
            <>
              <div className="space-y-1">
                <NavLink onClick={() => setIsOpen(false)} to="/home" className={mobileNavLinkClass}>Home</NavLink>
                <NavLink onClick={() => setIsOpen(false)} to="/products" className={mobileNavLinkClass}>Products</NavLink>
                <NavLink onClick={() => setIsOpen(false)} to="/categories" className={mobileNavLinkClass}>Categories</NavLink>
                <NavLink onClick={() => setIsOpen(false)} to="/brands" className={mobileNavLinkClass}>Brands</NavLink>
                <NavLink onClick={() => setIsOpen(false)} to="/cart" className={mobileNavLinkClass}>
                  Cart {cart && cart.numOfCartItems ? `(${cart.numOfCartItems})` : '(0)'}
                </NavLink>
                <NavLink onClick={() => setIsOpen(false)} to="/wish" className={mobileNavLinkClass}>
                  Wishlist {wishlist && wishlist.length > 0 ? `(${wishlist.length})` : ''}
                </NavLink>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => { setIsOpen(false); logout(); }}
                  className="w-full text-left rounded-xl px-4 py-2.5 text-base font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  <span>Log out</span>
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-2 pt-1">
              <NavLink onClick={() => setIsOpen(false)} to="/" className={mobileNavLinkClass}>Register</NavLink>
              <NavLink onClick={() => setIsOpen(false)} to="/login" className={mobileNavLinkClass}>Sign In</NavLink>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
