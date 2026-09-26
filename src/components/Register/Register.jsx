import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'

export default function Register() {
  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  let { setUserToken } = useContext(UserContext)
  let navigate = useNavigate()

  async function register(values) {
    try {
      setLoading(true)
      setApiError(null)
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      localStorage.setItem('userToken', data.token)
      setUserToken(data.token)
      navigate('/home')
    } catch (err) {
      setApiError(err?.response?.data?.message || 'Registration failed. Please check your data.')
      setLoading(false)
    }
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Full name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(25, 'Name must not exceed 25 characters'),
    email: Yup.string()
      .required('Email address is required')
      .email('Please enter a valid email address'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^01[0125][0-9]{8}$/, 'Must be a valid Egyptian number (e.g. 01012345678)'),
    password: Yup.string()
      .required('Password is required')
      .matches(/^[A-Z]\w{4,10}$/, 'Must start with capital letter & 5-11 chars (e.g. Ahmed123)'),
    rePassword: Yup.string()
      .required('Confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      rePassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: register,
  })

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-emerald-50/50 via-slate-50 to-teal-50/30">
      <div className="w-full max-w-xl">
        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-xl shadow-2xl shadow-emerald-950/10 rounded-3xl border border-slate-100 p-8 sm:p-10 transition-all duration-300 hover:shadow-emerald-900/15">
          
          {/* Header & Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white shadow-lg shadow-emerald-500/30 mb-4 transform hover:scale-105 transition-transform duration-200">
              <i className="fa-solid fa-basket-shopping text-2xl"></i>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              Create an Account
            </h1>
            <p className="text-slate-500 text-sm mt-1.5 font-normal">
              Join FreshCart today to enjoy fresh groceries delivered fast
            </p>
          </div>

          {/* API Error Alert */}
          {apiError && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-700 text-sm flex items-start gap-3 animate-fade-in" role="alert">
              <i className="fa-solid fa-circle-exclamation text-rose-500 mt-0.5 text-base flex-shrink-0"></i>
              <div className="font-medium">{apiError}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i className="fa-regular fa-user"></i>
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="John Doe"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50/70 border rounded-xl text-slate-900 text-sm placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus:ring-4 ${
                    formik.errors.name && formik.touched.name
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                      : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10'
                  }`}
                />
              </div>
              {formik.errors.name && formik.touched.name && (
                <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-rose-500">
                  <i className="fa-solid fa-circle-exclamation text-[11px]"></i>
                  <span>{formik.errors.name}</span>
                </div>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50/70 border rounded-xl text-slate-900 text-sm placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus:ring-4 ${
                    formik.errors.email && formik.touched.email
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                      : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10'
                  }`}
                />
              </div>
              {formik.errors.email && formik.touched.email && (
                <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-rose-500">
                  <i className="fa-solid fa-circle-exclamation text-[11px]"></i>
                  <span>{formik.errors.email}</span>
                </div>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number (Egypt)
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
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50/70 border rounded-xl text-slate-900 text-sm placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus:ring-4 ${
                    formik.errors.phone && formik.touched.phone
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                      : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10'
                  }`}
                />
              </div>
              {formik.errors.phone && formik.touched.phone && (
                <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-rose-500">
                  <i className="fa-solid fa-circle-exclamation text-[11px]"></i>
                  <span>{formik.errors.phone}</span>
                </div>
              )}
            </div>

            {/* Password & RePassword in 2 Columns on sm screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <i className="fa-solid fa-lock"></i>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    placeholder="Ahmed123"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full pl-10 pr-10 py-2.5 bg-slate-50/70 border rounded-xl text-slate-900 text-sm placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus:ring-4 ${
                      formik.errors.password && formik.touched.password
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                        : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
                  </button>
                </div>
                {formik.errors.password && formik.touched.password && (
                  <div className="mt-1 flex items-center gap-1 text-xs font-medium text-rose-500">
                    <i className="fa-solid fa-circle-exclamation text-[10px]"></i>
                    <span>{formik.errors.password}</span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="rePassword" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>
                  <input
                    type={showRePassword ? 'text' : 'password'}
                    name="rePassword"
                    id="rePassword"
                    placeholder="Ahmed123"
                    value={formik.values.rePassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full pl-10 pr-10 py-2.5 bg-slate-50/70 border rounded-xl text-slate-900 text-sm placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus:ring-4 ${
                      formik.errors.rePassword && formik.touched.rePassword
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                        : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowRePassword(!showRePassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    <i className={`fa-regular ${showRePassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
                  </button>
                </div>
                {formik.errors.rePassword && formik.touched.rePassword && (
                  <div className="mt-1 flex items-center gap-1 text-xs font-medium text-rose-500">
                    <i className="fa-solid fa-circle-exclamation text-[10px]"></i>
                    <span>{formik.errors.rePassword}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin text-lg"></i>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer Divider & Links */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}