import React, { useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Slider from "react-slick";
import Loading from '../Loading/Loading';
import { CartContext } from '../../Context/CartContext';
import { useContext } from 'react';
//import { WishContext } from '../../Context/WishContext';
export default function ProductDetails() {

 let{addProductToCart}= useContext(CartContext)
  const settings = {
    dots: false ,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed:1000
  };

  const[product,setProduct]= useState(null);
  const[loading,setLoading]= useState(true);
  let {id}= useParams();
async function getProduct(productId){

let{data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
console.log(data);
setProduct(data.data);
setLoading(false);

}
useEffect(()=>{

getProduct(id)

},[])
  return(
    <>
    <h1 className='text-3xl text-pink-500 mt-15 mb-2'> Product Detailes:</h1>
    {loading? <Loading/> :

<div className="flex p-2 items-center border-2 border-pink-500 rounded-2xl ">

  <div className="w-1/4 ">
  <Slider {...settings}>
      {product.images.map((image,index)=><img key={index} src={image} className='w-full h-[500px]'alt={product.title}/>)}
    </Slider>
  </div>
  <div className="w-3/4 ps-4">
  <h2 className='text-pink-500'>{product.title}</h2>
  <p className='m-2 text-gray'>{product.description}</p>
  <p>{product.category.name}</p>
  <div className="flex justify-between">
<div className="span ">{product.price} EGP</div>
<div className="span"><i className='fas fa-star text-pink-500'></i>{product.ratingsAverage} EGP</div>
</div>
<div className="buttons flex justify-between">
<button onClick={()=> addProductToCart(product.id)}  className="btn text-black bg-pink-300 hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add To Cart</button>
<button ><i className="fa-regular fa-heart text-2xl"></i></button>
</div>
  </div>
</div>
    }
    </>
 )
}
