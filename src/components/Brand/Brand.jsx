import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function Brand() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getBrands() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
          <i className="fa-solid fa-ribbon text-emerald-500"></i>
          Trusted Partners
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Featured Brands
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Discover top-tier grocery brands certified for quality and freshness
        </p>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="group bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 p-5 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
            >
              <div className="w-full h-28 flex items-center justify-center p-2 mb-3">
                <img
                  src={brand.image}
                  className="max-h-full max-w-full object-contain filter group-hover:brightness-105 group-hover:scale-105 transition-all duration-300"
                  alt={brand.name}
                  loading="lazy"
                />
              </div>
              <h3 className="font-semibold text-slate-800 text-sm group-hover:text-emerald-600 transition-colors">
                {brand.name}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
