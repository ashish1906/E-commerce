import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState(localStorage.getItem('lastEmail') || '')
  const [password, setPassword] = useState(localStorage.getItem('lastPassword') || '')

  const onSubmitHandler = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password })

      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)

        // Save last email/password for next login
        localStorage.setItem('lastEmail', email)
        localStorage.setItem('lastPassword', password)

        toast.success("Login successful!")
      } else {
        toast.error(response.data.message || "Invalid credentials")
      }

    } catch (error) {
      console.error(error)
      if (error.response && error.response.data) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Something went wrong")
      }
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-3 min-w-72 '>
            <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type="email"
              placeholder='your@gmail.com'
              required
            />
          </div>
          <div className='mb-3 min-w-72'>
            <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
              type="password"
              placeholder='Enter your password'
              required
            />
          </div>
          <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
