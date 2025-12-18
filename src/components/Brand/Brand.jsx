import React, { useEffect, useState } from 'react';
import style from './Brand.module.css';
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function Brand() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getBrands() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
    console.log(data);
    setBrands(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap py-8 gap-y-4 justify-center">
          {brands.map((brand) => (
            <div key={brand._id} className="w-1/6 product">
              <div className={style.category}>
                <img src={brand.image} className={style.categoryImage} alt={brand.name} />
                <h3 className={style.categoryName}>{brand.name}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
     
    </>
  );
}
