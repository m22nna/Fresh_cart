import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'

export default function Login() {
  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  let { setUserToken } = useContext(UserContext)
  let navigate = useNavigate()

  async function login(values) {
    try {
      setLoading(true)
      setApiError(null)
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      localStorage.setItem('userToken', data.token)
      setUserToken(data.token)
      navigate('/home')
    } catch (err) {
      setApiError(err?.response?.data?.message || 'Invalid email or password')
      setLoading(false)
    }
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email address is required')
      .email('Please enter a valid email address'),
    password: Yup.string()
      .required('Password is required')
      .matches(/^[A-Z]\w{4,10}$/, 'Must start with capital letter & 5-11 characters (e.g. Ahmed123)'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: login,
  })

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-emerald-50/50 via-slate-50 to-teal-50/30">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-xl shadow-2xl shadow-emerald-950/10 rounded-3xl border border-slate-100 p-8 sm:p-10 transition-all duration-300 hover:shadow-emerald-900/15">
          
          {/* Header & Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white shadow-lg shadow-emerald-500/30 mb-4 transform hover:scale-105 transition-transform duration-200">
              <i className="fa-solid fa-basket-shopping text-2xl"></i>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-500 text-sm mt-1.5 font-normal">
              Sign in to your FreshCart account to continue
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
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
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
                  className={`w-full pl-10 pr-4 py-3 bg-slate-50/70 border rounded-xl text-slate-900 text-sm placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus:ring-4 ${
                    formik.errors.email && formik.touched.email
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                      : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10'
                  }`}
                />
              </div>
              {formik.errors.email && formik.touched.email && (
                <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-500">
                  <i className="fa-solid fa-circle-exclamation text-[11px]"></i>
                  <span>{formik.errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <span className="text-xs text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer">
                  Hint: Ahmed123
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <i className="fa-solid fa-lock"></i>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full pl-10 pr-11 py-3 bg-slate-50/70 border rounded-xl text-slate-900 text-sm placeholder-slate-400 outline-none transition-all duration-200 focus:bg-white focus:ring-4 ${
                    formik.errors.password && formik.touched.password
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/10'
                      : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                >
                  <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {formik.errors.password && formik.touched.password && (
                <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-500">
                  <i className="fa-solid fa-circle-exclamation text-[11px]"></i>
                  <span>{formik.errors.password}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin text-lg"></i>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer Divider & Links */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account?{' '}
              <Link
                to="/"
                className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}