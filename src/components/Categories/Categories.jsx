import React, { useEffect, useState } from 'react';
import style from './Categories.module.css';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
//import SupCategories from '../SupCategories/SupCategories';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading,setLoading]=useState(true);
  async function getCategories() {
  let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    console.log(data);
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
   setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap py-8 gap-y-4  justify-center ">
         {categories.map((category) => (
            <div key={category._id} className="w-1/6 product  ">
              <div className={style.category}>
               <img src={category.image} className={style.categoryImage} alt={category.name} />
               <h3 className={style.categoryName}>{category.name}</h3>
               
              </div>
            </div>
          ))}
        </div>
      )}
      
    </>
  );
}