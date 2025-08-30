import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        axios.defaults.withCredentials = true;
      const res = await axios.post('http://localhost:5000/api/user/logout');
      if (res.data.success) {
        toast.success("Logged out successfully");
        navigate('/');
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-xl font-bold tracking-wide cursor-pointer" onClick={() => navigate('/dashboard')}>Lost & Found</h1>

        <nav className="flex items-center gap-6">
          <a href="/displaylost" className="hover:text-yellow-300 transition duration-200">
            Your Items
          </a>
          <a href="/displayfound" className="hover:text-yellow-300 transition duration-200">
            Approved Items
          </a>

          <button onClick={handleLogout} className="ml-4 px-4 py-2 bg-red-500 rounded-lg shadow hover:bg-red-600 transition duration-200">
            Logout
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
