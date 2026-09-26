import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-emerald-500 selection:text-white">
      <Navbar />
      <main className="flex-1 pt-18">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
