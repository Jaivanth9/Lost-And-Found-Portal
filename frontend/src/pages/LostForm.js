import React, { useState } from 'react'
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const LostForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    photo: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];  
      setFormData({ ...formData, photo: base64String });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/user/createitem',
        formData,
        { withCredentials: true }
      );
      const data = res.data;
      if (data.success) {
        toast.success(data.message);
        navigate('/dashboard');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex justify-center items-center py-10">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Report Lost Item
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label className="block text-gray-700 font-medium mb-1">Item Name</label>
              <input
                type="text"
                name="name"
                required
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Description</label>
              <textarea
                name="desc"
                required
                onChange={handleChange}
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LostForm
