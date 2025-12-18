import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import axios from 'axios'
import Slider from 'react-slick';
export default function CategorySlider() {
  const settings = {
    dots: false ,
    infinite: true,
    speed: 500,
    slidesToShow:6,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed:1000
  };

  const [categories,setCategories]=useState([])
  async function getCategories() {
    let{data}=await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
   // console.log(data)
   setCategories(data.data)
  }
  useEffect(()=>{

getCategories();

  },[])
  return (
    <>
     <Slider {...settings} className=' my-15'>
      {categories.map((category,index)=><div key={index} className='my-3  '>
        <img src={category.image} alt={category.name} className='w-full h-[200px] object-cover object-top'/>
        <h3>{category.name}</h3>

      </div> )}
    </Slider>
    
    </>
  )
}
