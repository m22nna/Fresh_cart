import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Toaster } from 'react-hot-toast'
import Home from './components/Home/Home'
import Layout from './components/kkk/Layout'
import Brand from './components/Brand/Brand'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import Notfound from './components/Notfound/Notfound'
import Products from './components/Products/Products'
//import SubBrands from './SubBrands/SubBrands'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

import { createHashRouter, RouterProvider } from 'react-router-dom'
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import CartContextProvider from './Context/CartContext'
import CheckOut from './components/CheckOut/CheckOut';
import AllOrders from './components/AllOrders/AllOrders';
import SupCategories from './components/SupCategories/SupCategories'
import Wish from './components/Wish/Wish';
import WishContextProvider from './Context/WishContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const routers = createHashRouter([{
 path:'',element:<Layout/>,children:[
  {index:true,element:<Register/>},
  {path:'login',element:<Login/>},
  {path:'home',element:<ProtectedRoute><Home/></ProtectedRoute>},
  {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
  {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
  {path:'brands',element:<ProtectedRoute><Brand/></ProtectedRoute>},
  {path:'wish',element:<ProtectedRoute><Wish/></ProtectedRoute>},
  {path:'productdetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
  {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute>},
  {path:'checkout',element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
  {path:'allorders',element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
  //{path:'supcategories',element:<ProtectedRoute><SupCategories/></ProtectedRoute>},
  {path:'orders',element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
  {path:'*',element:<Notfound/>}
 ] 
}])
const query=new QueryClient()
function App() {
 

  return (
    <>
       <QueryClientProvider client={query}>
        <CartContextProvider>
          <UserContextProvider>
            <WishContextProvider>
              <RouterProvider router={routers} />
              <ReactQueryDevtools />
              <Toaster />
            </WishContextProvider>
          </UserContextProvider>
        </CartContextProvider>
      </QueryClientProvider>
  
    </>
  )
}

export default App
