import React, { useContext, useEffect } from 'react'
import { WishContext } from '../../Context/WishContext'
import { CartContext } from '../../Context/CartContext'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Wish() {
  const { wishlist, wishlistIds, removeProductFromWishlist, getWishlist } = useContext(WishContext)
  const { addProductToCart } = useContext(CartContext)

  useEffect(() => {
    getWishlist()
  }, [])

  const handleAddToCart = async (productId) => {
    await addProductToCart(productId)
  }

  if (!wishlist) return <Loading />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold uppercase tracking-wider mb-2">
          <i className="fa-solid fa-heart text-rose-500"></i>
          My Wishlist
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Saved Items
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved to your wishlist
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-24 h-24 rounded-3xl bg-rose-50 flex items-center justify-center mb-6">
            <i className="fa-regular fa-heart text-4xl text-rose-300"></i>
          </div>
          <h2 className="text-xl font-bold text-slate-700 mb-2">Your wishlist is empty</h2>
          <p className="text-slate-500 text-sm mb-6">Browse products and save your favorites here</p>
          <Link
            to="/products"
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:from-emerald-600 hover:to-teal-700 transition-all duration-200"
          >
            <i className="fa-solid fa-store mr-2"></i>
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {wishlist.map((product) => (
            <div
              key={product._id || product.id}
              className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-rose-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image */}
              <div className="relative bg-slate-50/60 p-4 aspect-square flex items-center justify-center overflow-hidden">
                <span className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-md text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-emerald-100">
                  {product.category?.name}
                </span>

                {/* Remove from wishlist */}
                <button
                  onClick={() => removeProductFromWishlist(product._id || product.id)}
                  className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-rose-100 flex items-center justify-center text-rose-500 hover:bg-rose-50 hover:scale-110 active:scale-90 transition-all duration-200 cursor-pointer"
                  title="Remove from Wishlist"
                >
                  <i className="fa-solid fa-heart text-sm"></i>
                </button>

                <Link to={`/productdetails/${product._id || product.id}`} className="w-full h-full flex items-center justify-center">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 ease-out"
                    loading="lazy"
                  />
                </Link>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <i className="fa-solid fa-star text-amber-400 text-xs"></i>
                    <span className="text-xs font-bold text-slate-800">{product.ratingsAverage}</span>
                    <span className="text-[11px] text-slate-400">({product.ratingsQuantity || 50}+)</span>
                  </div>
                  <Link to={`/productdetails/${product._id || product.id}`}>
                    <h3 className="font-semibold text-slate-800 text-sm hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                      {product.title}
                    </h3>
                  </Link>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Price</span>
                      <div className="text-lg font-extrabold text-slate-900">
                        {product.price}{' '}
                        <span className="text-xs font-bold text-emerald-600">EGP</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product._id || product.id)}
                    className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/35 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <i className="fa-solid fa-cart-plus text-xs"></i>
                    <span>Add To Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
