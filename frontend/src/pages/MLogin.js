import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        regno: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async(e) => {
        axios.defaults.withCredentials=true;
        e.preventDefault();

        const res=await axios.post('http://localhost:5000/api/moderator/login', formData);
        const data=res.data;

        if(data.success){
            toast.success(data.message);
            navigate('/moddisplaylost');
        }else{
            toast.error(data.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-400">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-6">
                <h2 className="text-2xl font-bold text-center text-blue-600">Moderator Login</h2>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Registration Number</label>
                    <input 
                        type="Number" 
                        name="regno" 
                        value={formData.regno} 
                        onChange={handleChange} 
                        placeholder="Registration Number"
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        placeholder="Password"
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default MLogin
