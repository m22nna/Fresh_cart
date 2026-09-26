import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getCategories() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
          <i className="fa-solid fa-shapes text-emerald-500"></i>
          Explore Categories
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Shop By Category
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Browse through our wide selection of fresh grocery categories
        </p>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center p-5 text-center cursor-pointer"
            >
              <div className="w-full h-44 rounded-xl overflow-hidden bg-slate-50 mb-4 flex items-center justify-center">
                <img
                  src={category.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  alt={category.name}
                  loading="lazy"
                />
              </div>
              <h3 className="font-bold text-slate-800 text-base group-hover:text-emerald-600 transition-colors">
                {category.name}
              </h3>
              <span className="text-xs text-slate-400 mt-1 flex items-center gap-1 group-hover:text-emerald-500 transition-colors">
                <span>View Products</span>
                <i className="fa-solid fa-arrow-right text-[10px] transform group-hover:translate-x-1 transition-transform"></i>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}