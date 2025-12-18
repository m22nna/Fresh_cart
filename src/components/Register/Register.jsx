import React, { useContext, useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'


export default function Register() {
  const [apiError,setApiError]=useState(null)
  const [loading,setLoading]=useState(false)
  let {setUserToken}=useContext(UserContext)
  let navigate=useNavigate();
 async function register(values){
  try{
    setLoading(true)
   let {data} =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
   console.log(data);
   //setLoading(false);
   localStorage.setItem('userToken',data.token)
   setUserToken(data.token)
   navigate('home');
  }
   catch(err){
    console.log(err.response.data.message);
    setApiError(err.response.data.message)
    setLoading(false)
   }
}
let validationSchema =Yup.object().shape({
name:Yup.string().required('name is required').min(3,'min is 3').max(15,'max is 15'),
email:Yup.string().required('email is required').email('invaled email'),
password:Yup.string().required('password is requred').matches(/^[A-Z]\w{4,10}$/,'password is invalid ex(Ahmed123)'),
rePassword:Yup.string().required('repassword is required').oneOf([Yup.ref('password')],'password and repassword dont match'),
phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/,'we need egptian phone number')

})
const formik=useFormik({
 initialValues:{
  name:'',
  email:'',
  password:'',
  rePassword:'',
  phone:''
},validationSchema:validationSchema
,onSubmit:register})

  return (
    <>
   <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto py-20">
   {apiError &&<div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
  {apiError}
</div>}
<h1 className='text-center text-3xl text-pink-300'>Register</h1>
  <div className="relative z-0 w-full mb-5 group">
    <input type="text" name="name" id="name" value={formik.values.name}onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder=" " required />
    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name:</label>
  </div>
  {formik.errors.name && formik.touched.name &&<div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
  {formik.errors.name}
</div>}
  <div className="relative z-0 w-full mb-5 group">
    <input type="text" name="email" id="email" value={formik.values.email}onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder=" " required />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email:</label>
  </div>
  {formik.errors.email && formik.touched.email &&<div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
  {formik.errors.email}
</div>}
  <div className="relative z-0 w-full mb-5 group">
    <input type="password" name="password" id="password" value={formik.values.password}onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder=" " required />
    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password:</label>
  </div>
  {formik.errors.password && formik.touched.password &&<div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
  {formik.errors.password}
</div>}
  <div className="relative z-0 w-full mb-5 group">
    <input type="password" name="rePassword" id="rePassword" value={formik.values.rePassword}onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder=" " required />
    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">rePassword:</label>
  </div>
  {formik.errors.rePassword && formik.touched.rePassword &&<div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
  {formik.errors.rePassword}
</div>}

<div className="relative z-0 w-full mb-5 group">
    <input type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-black peer" placeholder=" " required />
    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone:</label>
  </div>
  {formik.errors.phone && formik.touched.phone &&<div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
    {formik.errors.phone}
</div>}
{loading? <button type="button" className="text-black bg-pink-200 hover:bg-pink-300 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    <i className='fas fa-spinner fa-spin'></i>
  </button>
 : <button type="submit" className="text-black bg-pink-200 hover:bg-pink-300 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>}
 
</form>

    </>
  )
}