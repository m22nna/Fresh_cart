import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Slider from 'react-slick'
import Loading from '../Loading/Loading'
import { CartContext } from '../../Context/CartContext'
import { WishContext } from '../../Context/WishContext'
import toast from 'react-hot-toast'

export default function ProductDetails() {
  let { addProductToCart } = useContext(CartContext)
  let { wishlistIds, addProductToWishlist, removeProductFromWishlist } = useContext(WishContext)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  let { id } = useParams()

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  async function getProduct(productId) {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
      setProduct(data.data)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProduct(id)
  }, [id])

  const handleAddToCart = async () => {
    setAdding(true)
    try {
      await addProductToCart(product.id)
    } finally {
      setAdding(false)
    }
  }

  const toggleWish = () => {
    const pid = product._id || product.id
    if (wishlistIds.has(pid)) {
      removeProductFromWishlist(pid)
    } else {
      addProductToWishlist(pid)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-8">
        <Link to="/home" className="hover:text-emerald-600 transition-colors">Home</Link>
        <i className="fa-solid fa-chevron-right text-[10px]"></i>
        <Link to="/products" className="hover:text-emerald-600 transition-colors">Products</Link>
        <i className="fa-solid fa-chevron-right text-[10px]"></i>
        <span className="text-slate-700 truncate max-w-xs">{product?.title || 'Details'}</span>
      </nav>

      {loading ? (
        <Loading />
      ) : product ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Product Gallery */}
          <div className="md:col-span-5 bg-slate-50/70 rounded-2xl p-6 flex items-center justify-center overflow-hidden">
            <div className="w-full max-w-sm">
              <Slider {...sliderSettings}>
                {product.images?.map((image, index) => (
                  <div key={index} className="outline-none">
                    <img
                      src={image}
                      alt={product.title}
                      className="w-full h-80 sm:h-96 object-contain mx-auto"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Product Info */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
                {product.category?.name}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center text-amber-400 text-sm">
                  <i className="fa-solid fa-star"></i>
                </div>
                <span className="font-bold text-slate-800 text-sm">
                  {product.ratingsAverage}
                </span>
                <span className="text-xs text-slate-400">
                  • {product.ratingsQuantity || 100}+ reviews
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                  <i className="fa-solid fa-check text-[10px]"></i> In Stock
                </span>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mt-4">
                {product.description}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium block">Total Price</span>
                <div className="text-3xl font-black text-slate-900">
                  {product.price}{' '}
                  <span className="text-base font-bold text-emerald-600">EGP</span>
                </div>
              </div>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-100/70 px-3 py-1.5 rounded-xl flex items-center gap-1">
                <i className="fa-solid fa-truck-fast"></i> Free Delivery
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="flex-1 py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 active:scale-[0.99] text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {adding ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                    <span>Adding to Cart...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-cart-plus"></i>
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={toggleWish}
                className="w-14 h-14 rounded-2xl border border-slate-200 hover:border-rose-200 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50/50 active:scale-95 transition-all duration-200 cursor-pointer"
                title="Wishlist"
              >
                <i className={`${wishlistIds.has(product?._id || product?.id) ? 'fa-solid fa-heart text-rose-500' : 'fa-regular fa-heart'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
