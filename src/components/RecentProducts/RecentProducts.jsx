import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { CartContext } from '../../Context/CartContext'
import { WishContext } from '../../Context/WishContext'
import toast from 'react-hot-toast'

export default function RecentProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [addingId, setAddingId] = useState(null)

  let { addProductToCart } = useContext(CartContext)
  let { wishlistIds, addProductToWishlist, removeProductFromWishlist } = useContext(WishContext)

  async function getProducts() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
      setProducts(data.data)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const toggleWishlist = (e, productId) => {
    e.preventDefault()
    e.stopPropagation()
    if (wishlistIds.has(productId)) {
      removeProductFromWishlist(productId)
    } else {
      addProductToWishlist(productId)
    }
  }

  const handleAddToCart = async (e, productId) => {
    e.preventDefault()
    e.stopPropagation()
    setAddingId(productId)
    try {
      await addProductToCart(productId)
    } finally {
      setAddingId(null)
    }
  }

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category?.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
            <i className="fa-solid fa-sparkles text-emerald-500"></i>
            Fresh Arrivals
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Popular Products
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Handpicked organic fruits, vegetables, and everyday grocery essentials
          </p>
        </div>

        {/* Search Bar Filter */}
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <i className="fa-solid fa-magnifying-glass text-sm"></i>
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm"
          />
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Image & Badges */}
              <div className="relative bg-slate-50/60 p-4 aspect-square flex items-center justify-center overflow-hidden">
                {/* Category Badge */}
                <span className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-md text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-emerald-100">
                  {product.category?.name}
                </span>

                {/* Wishlist Button */}
                <button
                  onClick={(e) => toggleWishlist(e, product.id)}
                  type="button"
                  className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:scale-110 active:scale-90 transition-all duration-200 cursor-pointer"
                  title="Add to Wishlist"
                >
                  <i
                    className={`${
                      wishlistIds.has(product.id)
                        ? 'fa-solid fa-heart text-rose-500'
                        : 'fa-regular fa-heart'
                    } text-sm`}
                  ></i>
                </button>

                {/* Product Link & Image */}
                <Link
                  to={`/productdetails/${product.id}`}
                  className="w-full h-full flex items-center justify-center"
                >
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-300 ease-out"
                    loading="lazy"
                  />
                </Link>
              </div>

              {/* Card Content */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="flex items-center text-amber-400 text-xs">
                      <i className="fa-solid fa-star"></i>
                    </div>
                    <span className="text-xs font-bold text-slate-800">
                      {product.ratingsAverage}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      ({product.ratingsQuantity || 50}+)
                    </span>
                  </div>

                  {/* Title */}
                  <Link to={`/productdetails/${product.id}`}>
                    <h3 className="font-semibold text-slate-800 text-sm hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                      {product.title}
                    </h3>
                  </Link>
                </div>

                {/* Price & Add to Cart */}
                <div className="pt-3 mt-3 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Price</span>
                      <div className="text-lg font-extrabold text-slate-900">
                        {product.price}{' '}
                        <span className="text-xs font-bold text-emerald-600">EGP</span>
                      </div>
                    </div>
                    {product.priceAfterDiscount && (
                      <span className="text-xs text-slate-400 line-through">
                        {product.priceAfterDiscount} EGP
                      </span>
                    )}
                  </div>

                  {/* Add To Cart Button */}
                  <button
                    onClick={(e) => handleAddToCart(e, product.id)}
                    disabled={addingId === product.id}
                    className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/35 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {addingId === product.id ? (
                      <>
                        <i className="fa-solid fa-circle-notch fa-spin text-sm"></i>
                        <span>Adding...</span>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-cart-plus text-xs"></i>
                        <span>Add To Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
