//import React from 'react'
//import style from './CheckOut.module.css'
//export default function CheckOut() {
  //return (
   // <>
   // <h2 className=' py-15'>CheckOut</h2>
    
   // </>
 // )
//}
import React, { useContext, useState } from 'react'
import style from './Checkout.module.css'
//import style from'./Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
//import Login from './Login';
//import Login from './Login';
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function Checkout() {
  //const [apiError,setApiError]=useState(null)
  const [loading,setLoading]=useState(false)
  let {cart}=useContext(CartContext)
 // let navigate=useNavigate();
 async function handleCheckout(shippingAddress){
  try{
    setLoading(true)
   let {data} =await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`,{
    shippingAddress
   },{                                              
    headers:{
      token:localStorage.getItem('userToken')
    }
   })
   console.log(data);
   toast.success(data.status)
   location.href=data.session.url
   //setLoading(false);
   //localStorage.setItem('userToken',data.token)
   //setUserToken(data.token)
   //navigate('/home');
  }
   catch(err){
    console.log(err.response.data.message);
    setApiError(err.response.data.message);
    setLoading(false);
   }
}


const formik=useFormik({
 initialValues:{
 
  city:'',
  detailes:'',
  phone:'',
  
}
,onSubmit:handleCheckout})

  return (
    <>
    <h2 className='text-center'>menna</h2>
   <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto py-20">
   
 
  <div className="relative z-0 w-full mb-5 group">
    <input type="text" name="city" id="city" value={formik.values.city}onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder=" " required />
    <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">city:</label>
  </div>
 
  <div className="relative z-0 w-full mb-5 group">
    <input type="text" name="detailes" id="detailes" value={formik.values.detailes}onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder=" " required />
    <label htmlFor="detailes" className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">detailes:</label>
  </div>
 
  <div className="relative z-0 w-full mb-5 group">
    <input type="tel" name="phone" id="phone" value={formik.values.phone}onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder=" " required />
    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone:</label>
  </div>
 
  
 


{loading? <button type="button" className="text-black bg-pink-200 hover:bg-pink-300 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    <i className='fas fa-spinner fa-spin'></i>
  </button>
 : <button type="submit" className="text-black bg-pink-200 hover:bg-pink-300 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>}
 
</form>

    </>
  )
}