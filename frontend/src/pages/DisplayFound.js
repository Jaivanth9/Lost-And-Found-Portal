import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Header from '../components/Header'

const DisplayFound = () => {
  const [foundItems, setFoundItems] = React.useState([])

  const getPhotoSrc = (base64string) => {
    return `data:image/jpeg;base64,${base64string}`
  }

  useEffect(() => {
    const fetchData = async () => {
      axios.defaults.withCredentials = true
      const res = await axios.get('http://localhost:5000/api/user/approveditems')
      const data = res.data
      if (data.success) {
        setFoundItems(data.approvedItems)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Approved Items</h2>
        {foundItems.length === 0 ? (
          <p className="text-center text-gray-600">No approved items found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {foundItems.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center"
              >
                <img
                  src={getPhotoSrc(item.photo)}
                  alt={item.name}
                  className="w-40 h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-2 text-center">{item.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DisplayFound
