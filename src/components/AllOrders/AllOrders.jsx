import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext } from '../../Context/UserContext'
import Loading from '../Loading/Loading'

export default function AllOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { userToken } = useContext(UserContext)

  async function getUserOrders() {
    try {
      // Get user id from token by fetching user profile
      const profileRes = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/auth/verifyToken',
        { headers: { token: localStorage.getItem('userToken') } }
      )
      const userId = profileRes.data.decoded?.id
      if (!userId) {
        setLoading(false)
        return
      }
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      )
      setOrders(data)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserOrders()
  }, [])

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid': return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'delivered': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-amber-100 text-amber-700 border-amber-200'
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
          <i className="fa-solid fa-box-open text-emerald-500"></i>
          Order History
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          My Orders
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Track and review all your past purchases
        </p>
      </div>

      {loading ? (
        <Loading />
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-24 h-24 rounded-3xl bg-emerald-50 flex items-center justify-center mb-6">
            <i className="fa-solid fa-box-open text-4xl text-emerald-300"></i>
          </div>
          <h2 className="text-xl font-bold text-slate-700 mb-2">No orders yet</h2>
          <p className="text-slate-500 text-sm">When you place orders they will appear here</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={order._id || index}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-slate-50/70 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <i className="fa-solid fa-receipt text-emerald-600"></i>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Order ID</p>
                    <p className="font-bold text-slate-800 text-sm">#{order.id || order._id?.slice(-8)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Date</p>
                    <p className="text-sm font-semibold text-slate-700">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-EG', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Total</p>
                    <p className="text-sm font-extrabold text-slate-900">{order.totalOrderPrice} <span className="text-emerald-600 text-xs">EGP</span></p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${getStatusColor(order.isPaid ? 'paid' : 'pending')}`}>
                    {order.isPaid ? 'Paid' : 'Pending'}
                  </span>
                  {order.isDelivered && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold border bg-blue-100 text-blue-700 border-blue-200">
                      Delivered
                    </span>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="divide-y divide-slate-100">
                {order.cartItems?.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors">
                    <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img
                        src={item.product?.imageCover}
                        alt={item.product?.title}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm truncate">{item.product?.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Qty: {item.count}</p>
                    </div>
                    <p className="font-bold text-slate-700 text-sm whitespace-nowrap">
                      {item.price} <span className="text-emerald-600 text-xs font-semibold">EGP</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Shipping info */}
              {order.shippingAddress && (
                <div className="px-6 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                  <i className="fa-solid fa-location-dot text-emerald-500"></i>
                  <span>
                    {[order.shippingAddress.details, order.shippingAddress.city, order.shippingAddress.phone].filter(Boolean).join(' • ')}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
