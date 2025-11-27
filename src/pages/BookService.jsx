import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookService = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    const navigate = useNavigate();
    const location = useLocation();
    const serviceData = location.state?.serviceData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Show success toast using react-toastify
        toast.success('Booking successful!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
        
        // Clear form
        setFormData({
            name: '',
            email: ''
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 py-16 px-4">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center text-indigo-600 mb-2">
                    Book Service
                </h1>
                
                {serviceData && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <h2 className="text-xl font-semibold text-gray-800">{serviceData.serviceName}</h2>
                        <p className="text-gray-600">Provider: {serviceData.providerName}</p>
                        <p className="text-gray-600">Price: ${serviceData.price}</p>
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 text-left">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 text-left">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Book Now
                    </button>
                </form>
                
                {/* Toast Container for react-toastify */}
                <ToastContainer />
            </div>
        </div>
    );
};

export default BookService;