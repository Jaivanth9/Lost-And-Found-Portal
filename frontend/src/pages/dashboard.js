import React from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">
      <Header/>
      <div className="flex flex-col items-center justify-center mt-20 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to User Dashboard</h1>
        <button 
          onClick={() => navigate('/lostForm')} 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
        >
          Lost Items Complaint
        </button>
      </div>
    </div>
  )
}

export default Dashboard
