import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <h1 className="text-3xl font-bold mb-10 text-gray-800">Lost & Found Portal</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center w-72">
          <p className="text-lg font-semibold mb-4">User</p>
          <button 
            onClick={() => navigate('/signup')} 
            className="mb-3 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
          <button 
            onClick={() => navigate('/login')} 
            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Log In
          </button>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center w-72">
          <p className="text-lg font-semibold mb-4">Moderator</p>
          <button 
            onClick={() => navigate('/modsignup')} 
            className="mb-3 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
          <button 
            onClick={() => navigate('/modlogin')} 
            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
