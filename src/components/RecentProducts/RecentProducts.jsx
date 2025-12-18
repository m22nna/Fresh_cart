import React, { useContext, useEffect, useState } from 'react'
import style from './RecentProducts.module.css'
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { CartContext } from '../../Context/CartContext';
import { useQuery } from '@tanstack/react-query';





export default function RecentProducts() {
  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(true);
  
  let {addProductToCart}=useContext(CartContext)
  async function getProducts() {
    let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products');
    console.log(data);
    setProducts(data.data)
    setLoading(false);
  }
  useEffect(()=>{
getProducts()
  },[])
  
  return (
    <>
     <h1 className='text-3xl text-black mt-15 mb-2'>Our Products:</h1>
    {loading?<Loading/>:
    
    <div className="flex flex-wrap py-8 my-11 gapy-4 justify-center  ">
    {products.map((product)=>  <div key={product.id} className="w-1/6">
   
    <div className="product p-2 rounded-lg overflow-hidden">
    <Link to={`/productdetails/${product.id} `}>
        <img src={product.imageCover} className='w-fill' alt={product.title}/>
        <h3 className='text-pink-500'>{product.category.name}</h3>
        <h3 className='text-black'>{product.title.split(' ',2).join(' ')}</h3>
        <div className="flex justify-between">
<div className="span">{product.price} EGP</div>
<div className="span"><i className='fas fa-star text-pink-500'></i>{product.ratingsAverage} EGP</div>
</div>
</Link>
<div className="buttons flex justify-between">
<button onClick={()=>addProductToCart(product.id)} className=" btn text-black bg-pink-300 hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add To Cart</button>
 <button><i className="fa-regular fa-heart text-2xl"></i></button>
</div>

       
      </div>
      </div>)}
    </div>
} 
  
    
    </>
  )
}
