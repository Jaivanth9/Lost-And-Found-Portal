import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Header from '../components/Header'

const DisplayLost = () => {
  const [foundItems, setFoundItems] = React.useState([])

  const getPhotoSrc = (base64string) => {
    if (!base64string) return ''
    return `data:image/png;base64,${base64string}`
  }

  useEffect(() => {
    const displayl = async () => {
      axios.defaults.withCredentials = true
      const res = await axios.get('http://localhost:5000/api/user/lostitems')
      const data = res.data
      if (data.success) {
        setFoundItems(data.lostItems)
      } else {
        toast.error(data.message)
      }
    }
    displayl()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto p-6">

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Your Items
        </h2>

        {foundItems?.length === 0 ? (
          <p className="text-center text-gray-600">No lost items found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {foundItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center space-y-3"
              >
                <h3 className="text-xl font-semibold text-gray-700">
                  {item.name}
                </h3>
                <p className="text-gray-500">{item.desc}</p>
                {item.photo && (
                  <img
                    src={getPhotoSrc(item.photo)}
                    alt={item.name}
                    className="w-48 h-48 object-cover rounded-lg shadow"
                  />
                )}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.status === 'Found'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DisplayLost
