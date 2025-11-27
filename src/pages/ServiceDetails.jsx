import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router'; 
import AOS from 'aos';
import 'aos/dist/aos.css';

const ServiceDetails = () => {
    const { serviceId } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        
        AOS.init({
            duration: 1000,
            once: false, // allows reanimation when scrolling again
            mirror: true, // replays when scrolling up
        });

        const loadService = async () => {
            try {
                const response = await fetch('/pet-care.json');
                if (!response.ok) {
                    throw new Error('Failed to load service details');
                }
                const data = await response.json();
                const foundService = data.find(s => s.serviceId === parseInt(serviceId));

                if (!foundService) {
                    throw new Error('Service not found');
                }

                setService(foundService);
                setLoading(false);
                setTimeout(() => AOS.refresh(), 100); // refresh animations
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        loadService();
    }, [serviceId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading service details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center text-red-600">
                    <h2 className="text-2xl font-bold mb-4">Error Loading Service</h2>
                    <p>{error}</p>
                    <Link to="/services" className="text-blue-600 hover:underline mt-4 inline-block">
                        Back to Services
                    </Link>
                </div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
                    <Link to="/services" className="text-blue-600 hover:underline">
                        Back to Services
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">

                    {/* Left Column - Service Image */}
                    <div className="flex flex-col items-center" data-aos="fade-right">
                        <div className="w-full max-w-md rounded-lg overflow-hidden mb-6" data-aos="zoom-in">
                            <div className="aspect-square flex items-center justify-center">
                                <img 
                                    src={service.image} 
                                    alt={service.serviceName}
                                    className="w-full h-full object-cover rounded-lg shadow-lg"
                                />
                            </div>
                        </div>

                        {/* Additional Info Cards */}
                        <div className="w-full space-y-4" data-aos="fade-up">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-blue-900 mb-2">Quick Info</h4>
                                <div className="space-y-1 text-sm text-blue-800">
                                    <p><span className="font-medium">Category:</span> {service.category}</p>
                                    <p><span className="font-medium">Rating:</span> ⭐ {service.rating}/5</p>
                                    <p><span className="font-medium">Available Slots:</span> {service.slotsAvailable}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Service Details */}
                    <div className="space-y-6" data-aos="fade-left">
                        {/* Title and Author */}
                        <div data-aos="fade-down">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{service.serviceName}</h1>
                            <p className="text-lg text-gray-600 mb-4">By: {service.providerName}</p>
                            <div className="flex items-center space-x-4 mb-4">
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {service.category}
                                </span>
                                <div className="flex items-center">
                                    <span className="text-yellow-400 text-lg">★</span>
                                    <span className="ml-1 text-gray-600">{service.rating}</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div data-aos="fade-up">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Description</h3>
                            <p className="text-gray-700 leading-relaxed">{service.description}</p>
                        </div>

                        {/* Tags */}
                        <div data-aos="zoom-in">
                            <div className="flex justify-start gap-2">
                                <h4 className="text-sm font-medium text-gray-900">Tags:</h4>
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                    {service.category}
                                </span>
                            </div>
                        </div>

                        {/* Service Details */}
                        <div data-aos="fade-up">
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Service Details</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="text-gray-600">Service ID:</span>
                                    <span className="font-medium">{service.serviceId}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="text-gray-600">Provider Email:</span>
                                    <span className="font-medium">{service.providerEmail}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="text-gray-600">Available Slots:</span>
                                    <span className="font-medium">{service.slotsAvailable}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-200">
                                    <span className="text-gray-600">Rating:</span>
                                    <span className="font-medium">{service.rating}/5 ⭐</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-gray-600">Price:</span>
                                    <span className="font-bold text-blue-600 text-lg">${service.price}</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4 pt-6" data-aos="zoom-in-up">
                            <button 
                                onClick={() => navigate('/book-service', { state: { serviceData: service } })}
                                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                Book Service
                            </button>
                            <button className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                                Contact Provider
                            </button>
                        </div>

                        {/* Back Button */}
                        <div className="pt-4" data-aos="fade-up">
                            <Link
                                to="/services"
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                ← Back to All Services
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;
