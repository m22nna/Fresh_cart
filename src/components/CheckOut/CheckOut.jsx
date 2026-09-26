import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function CheckOut() {
  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false)
  let { cart } = useContext(CartContext)

  async function handleCheckout(shippingAddress) {
    try {
      setLoading(true)
      setApiError(null)
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`,
        { shippingAddress },
        { headers: { token: localStorage.getItem('userToken') } }
      )
      toast.success(data.status)
      location.href = data.session.url
    } catch (err) {
      const msg = err?.response?.data?.message || 'Something went wrong'
      setApiError(msg)
      toast.error(msg)
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      city: '',
      detailes: '',
      phone: '',
    },
    onSubmit: handleCheckout,
  })

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-emerald-50/50 via-slate-50 to-teal-50/30">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-xl shadow-2xl shadow-emerald-950/10 rounded-3xl border border-slate-100 p-8 sm:p-10">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white shadow-lg shadow-emerald-500/30 mb-4">
              <i className="fa-solid fa-truck-fast text-2xl"></i>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              Checkout
            </h1>
            <p className="text-slate-500 text-sm mt-1.5">
              Enter your shipping address to complete your order
            </p>
          </div>

          {/* API Error */}
          {apiError && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-700 text-sm flex items-start gap-3" role="alert">
              <i className="fa-solid fa-circle-exclamation text-rose-500 mt-0.5 flex-shrink-0"></i>
              <div className="font-medium">{apiError}</div>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* City */}
            <div>
              <label htmlFor="city" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                City
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i className="fa-solid fa-city"></i>
                </div>
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="Cairo"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>
            </div>

            {/* Details */}
            <div>
              <label htmlFor="detailes" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Address Details
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <input
                  type="text"
                  name="detailes"
                  id="detailes"
                  placeholder="Street, Building, Floor..."
                  value={formik.values.detailes}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="01012345678"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin text-lg"></i>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-lock text-sm"></i>
                    <span>Pay Now</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}