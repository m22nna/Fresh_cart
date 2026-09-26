import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/80 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <i className="fa-solid fa-cart-shopping text-sm"></i>
              </div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                Fresh<span className="text-emerald-600">Cart</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Your favorite daily grocery store. Delivering fresh vegetables, fruits, and essentials right to your doorstep.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                <i className="fa-brands fa-facebook-f text-xs"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                <i className="fa-brands fa-twitter text-xs"></i>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                <i className="fa-brands fa-instagram text-xs"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li><Link to="/categories" className="hover:text-emerald-600 transition-colors">Fresh Vegetables</Link></li>
              <li><Link to="/categories" className="hover:text-emerald-600 transition-colors">Organic Fruits</Link></li>
              <li><Link to="/categories" className="hover:text-emerald-600 transition-colors">Dairy & Eggs</Link></li>
              <li><Link to="/categories" className="hover:text-emerald-600 transition-colors">Bakery & Snacks</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li><span className="hover:text-emerald-600 transition-colors cursor-pointer">Help Center</span></li>
              <li><span className="hover:text-emerald-600 transition-colors cursor-pointer">Track Your Order</span></li>
              <li><span className="hover:text-emerald-600 transition-colors cursor-pointer">Return & Refund</span></li>
              <li><span className="hover:text-emerald-600 transition-colors cursor-pointer">Terms & Conditions</span></li>
            </ul>
          </div>

          {/* App / Delivery Banner */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">
              Fresh Delivery Guarantee
            </h4>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
              <div className="flex items-center gap-3 mb-2 text-emerald-800 font-semibold text-sm">
                <i className="fa-solid fa-truck-fast text-emerald-600 text-base"></i>
                <span>Fast 30-Min Delivery</span>
              </div>
              <p className="text-xs text-emerald-700/80 leading-relaxed">
                Enjoy free delivery on your first order above 200 EGP.
              </p>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 FreshCart. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><i className="fa-solid fa-shield-halved text-emerald-600"></i> Secure Payments</span>
            <span className="flex items-center gap-1.5"><i className="fa-solid fa-leaf text-emerald-600"></i> 100% Organic</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
