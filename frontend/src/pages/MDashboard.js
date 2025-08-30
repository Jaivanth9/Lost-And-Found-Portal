import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MDashboard = () => {
    const navigate = useNavigate();
    const [lostItems, setLostItems] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const getit = async () => {
            try {
                setLoading(true);
                const res = await axios.get("http://localhost:5000/api/moderator/displayitems");
                const data = res.data;
                if (data.success) {
                    setLostItems(data.lostItems);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getit();
    }, []);

    const handleApprove = async (itemId) => {
        try {
            const res = await axios.post("http://localhost:5000/api/moderator/approve", { itemId });
            if (res.data.success) {
                setLostItems((prev) => prev.filter((item) => item._id !== itemId));
            } else {
                setError(res.data.message);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleReject = async (itemId) => {
        try {
            const res = await axios.post("http://localhost:5000/api/moderator/reject", { itemId });
            if (res.data.success) {
                setLostItems((prev) => prev.filter((item) => item._id !== itemId));
            } else {
                setError(res.data.message);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post('http://localhost:5000/api/moderator/logout');
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

    const getPhotoSrc = (base64string) => {
        if (!base64string) return '';
        return `data:image/png;base64,${base64string}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
            <header className="bg-blue-600 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold tracking-wide">Lost & Found</h1>
                    <nav className="flex items-center gap-6">
                        <a
                            href="/displayfound"
                            className="text-white hover:text-yellow-300 font-medium transition-colors duration-200"
                        >
                            Approved Items
                        </a>
                        <button
                            onClick={handleLogout}
                            className="ml-4 px-5 py-2 bg-red-500 rounded-lg shadow hover:bg-red-600 transition duration-200 font-semibold"
                        >
                            Logout
                        </button>
                    </nav>
                </div>
            </header>

            <main className="max-w-6xl mx-auto mt-10 px-6">
                <div className="bg-white shadow-lg rounded-3xl p-8">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">
                        Moderator Dashboard
                    </h2>
                    <h3 className="text-2xl font-semibold mb-6 text-gray-700 border-b pb-3 border-gray-200 text-center">
                        Lost Items
                    </h3>

                    {error && (
                        <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
                    )}

                    {loading ? (
                        <p className="text-gray-500 text-center text-lg">Loading...</p>
                    ) : lostItems.length === 0 ? (
                        <p className="text-gray-600 text-center text-lg">
                            No lost items found.
                        </p>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {lostItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-gray-50 border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
                                >
                                    <div className="flex flex-col md:flex-row md:gap-4 items-center">
                                        {item.photo && (
                                            <img
                                                src={getPhotoSrc(item.photo)}
                                                alt={item.name}
                                                className="w-full md:w-32 h-32 object-cover rounded-lg shadow mb-4 md:mb-0"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <h4 className="text-xl font-semibold text-gray-700 mb-1">
                                                {item.name}
                                            </h4>
                                            <p className="text-gray-500">{item.desc}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 justify-center mt-4">
                                        <button
                                            onClick={() => handleApprove(item._id)}
                                            className="flex-1 px-4 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition-colors duration-200 font-semibold"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(item._id)}
                                            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition-colors duration-200 font-semibold"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default MDashboard;
