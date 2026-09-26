import React, { useContext, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { cart, cartLoading, updatProductCountToCart, deleteProductToCart, clearCart } = useContext(CartContext)
  const [updatingId, setUpdatingId] = useState(null)
  const [removingId, setRemovingId] = useState(null)
  const [clearing, setClearing] = useState(false)

  const handleUpdateCount = async (productId, newCount, currentCount) => {
    setUpdatingId(productId)
    if (newCount < 1) {
      await deleteProductToCart(productId)
    } else {
      await updatProductCountToCart(productId, newCount)
    }
    setUpdatingId(null)
  }

  const handleRemove = async (productId) => {
    setRemovingId(productId)
    await deleteProductToCart(productId)
    setRemovingId(null)
  }

  const handleClearCart = async () => {
    setClearing(true)
    await clearCart()
    setClearing(false)
  }

  // Still loading from API
  if (cartLoading) return <Loading />

  // Empty cart
  if (!cart || !cart.data?.products?.length) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
            <i className="fa-solid fa-basket-shopping text-emerald-500"></i>
            Shopping Cart
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">My Cart</h1>
        </div>
        <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="w-24 h-24 rounded-3xl bg-emerald-50 flex items-center justify-center mb-6">
            <i className="fa-solid fa-cart-shopping text-4xl text-emerald-300"></i>
          </div>
          <h2 className="text-xl font-bold text-slate-700 mb-2">Your cart is empty</h2>
          <p className="text-slate-500 text-sm mb-6 max-w-xs">
            Looks like you haven't added anything yet. Browse our products and start shopping!
          </p>
          <Link
            to="/products"
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 flex items-center gap-2"
          >
            <i className="fa-solid fa-store text-sm"></i>
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  const products = cart.data.products
  const totalPrice = cart.data.totalCartPrice
  const numItems = cart.numOfCartItems

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
            <i className="fa-solid fa-basket-shopping text-emerald-500"></i>
            Shopping Cart
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">My Cart</h1>
          <p className="text-slate-500 text-sm mt-1">
            {numItems} {numItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <button
          onClick={handleClearCart}
          disabled={clearing}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-all duration-200 disabled:opacity-60 cursor-pointer"
        >
          {clearing ? (
            <i className="fa-solid fa-circle-notch fa-spin text-sm"></i>
          ) : (
            <i className="fa-solid fa-trash text-sm"></i>
          )}
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {products.map((item) => {
            const pid = item.product.id || item.product._id
            const isUpdating = updatingId === pid
            const isRemoving = removingId === pid
            return (
              <div
                key={pid}
                className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${isRemoving ? 'opacity-50 scale-95' : ''}`}
              >
                <div className="flex gap-4 p-4">
                  {/* Product Image */}
                  <Link to={`/productdetails/${pid}`} className="flex-shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                          {item.product.category?.name}
                        </span>
                        <Link to={`/productdetails/${pid}`}>
                          <h3 className="font-semibold text-slate-800 text-sm sm:text-base hover:text-emerald-600 transition-colors line-clamp-2 leading-snug mt-0.5">
                            {item.product.title}
                          </h3>
                        </Link>
                      </div>
                      {/* Remove button */}
                      <button
                        onClick={() => handleRemove(pid)}
                        disabled={isRemoving}
                        className="flex-shrink-0 w-8 h-8 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 flex items-center justify-center transition-all duration-200 cursor-pointer"
                        title="Remove item"
                      >
                        {isRemoving
                          ? <i className="fa-solid fa-circle-notch fa-spin text-xs"></i>
                          : <i className="fa-solid fa-xmark text-sm"></i>
                        }
                      </button>
                    </div>

                    {/* Price + Quantity */}
                    <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                      {/* Quantity Control */}
                      <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
                        <button
                          onClick={() => handleUpdateCount(pid, item.count - 1, item.count)}
                          disabled={isUpdating}
                          className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-rose-500 hover:bg-rose-50 transition-all duration-200 disabled:opacity-50 cursor-pointer"
                        >
                          {isUpdating && item.count > 1
                            ? <i className="fa-solid fa-circle-notch fa-spin text-[10px]"></i>
                            : <i className="fa-solid fa-minus text-[10px]"></i>
                          }
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-slate-800">
                          {item.count}
                        </span>
                        <button
                          onClick={() => handleUpdateCount(pid, item.count + 1, item.count)}
                          disabled={isUpdating}
                          className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 disabled:opacity-50 cursor-pointer"
                        >
                          {isUpdating
                            ? <i className="fa-solid fa-circle-notch fa-spin text-[10px]"></i>
                            : <i className="fa-solid fa-plus text-[10px]"></i>
                          }
                        </button>
                      </div>

                      {/* Item Total Price */}
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Item total</span>
                        <span className="text-base font-extrabold text-slate-900">
                          {(item.price * item.count).toLocaleString()}
                          <span className="text-xs font-bold text-emerald-600 ml-1">EGP</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sticky top-24">
            <h2 className="text-base font-bold text-slate-800 mb-5 flex items-center gap-2">
              <i className="fa-solid fa-receipt text-emerald-600"></i>
              Order Summary
            </h2>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal ({numItems} items)</span>
                <span className="font-semibold">{totalPrice?.toLocaleString()} EGP</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <i className="fa-solid fa-truck-fast text-emerald-500 text-xs"></i>
                  Delivery
                </span>
                <span className="font-semibold text-emerald-600">Free</span>
              </div>
              <div className="border-t border-slate-100 pt-3 flex justify-between text-slate-900">
                <span className="font-bold text-base">Total</span>
                <div className="text-right">
                  <span className="text-xl font-black">{totalPrice?.toLocaleString()}</span>
                  <span className="text-sm font-bold text-emerald-600 ml-1">EGP</span>
                </div>
              </div>
            </div>

            <Link to="/checkout">
              <button className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer">
                <i className="fa-solid fa-lock text-sm"></i>
                Proceed to Checkout
              </button>
            </Link>

            <Link to="/products">
              <button className="w-full mt-3 py-2.5 text-sm font-semibold text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer">
                <i className="fa-solid fa-arrow-left text-xs"></i>
                Continue Shopping
              </button>
            </Link>

            {/* Trust badges */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-around text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <i className="fa-solid fa-shield-halved text-emerald-500"></i>
                Secure
              </span>
              <span className="flex items-center gap-1">
                <i className="fa-solid fa-truck-fast text-emerald-500"></i>
                Free Delivery
              </span>
              <span className="flex items-center gap-1">
                <i className="fa-solid fa-rotate-left text-emerald-500"></i>
                Easy Returns
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}