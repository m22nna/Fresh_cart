import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Slider from 'react-slick';

export default function CategorySlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 5 }
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 }
      }
    ]
  };

  const [categories, setCategories] = useState([]);

  async function getCategories() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(data.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <i className="fa-solid fa-fire text-emerald-500"></i>
          Shop Popular Categories
        </h3>
      </div>
      <Slider {...settings} className="category-slider -mx-2">
        {categories.map((category) => (
          <div key={category._id} className="px-2 outline-none">
            <div className="group bg-white rounded-2xl p-3 border border-slate-100 hover:border-emerald-200 shadow-xs hover:shadow-md transition-all duration-300 text-center cursor-pointer">
              <div className="w-full h-32 rounded-xl overflow-hidden mb-2 bg-slate-50 flex items-center justify-center">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h4 className="text-xs font-semibold text-slate-700 group-hover:text-emerald-600 truncate transition-colors">
                {category.name}
              </h4>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
