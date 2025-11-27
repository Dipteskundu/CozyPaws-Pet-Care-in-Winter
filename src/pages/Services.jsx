import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router'; 
import AOS from 'aos';
import 'aos/dist/aos.css';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredServices, setFilteredServices] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        //  initialize AOS with repeatable animation
        AOS.init({
            duration: 1000,
            once: false, // <--- makes animation play every time you scroll down again
            mirror: true, // <--- animates again when scrolling back up
        });

        const loadServices = async () => {
            try {
                const response = await fetch('/pet-care.json');
                if (!response.ok) {
                    throw new Error('Failed to load services');
                }
                const data = await response.json();
                setServices(data);
                setFilteredServices(data);
                setLoading(false);
                //  refresh AOS after data loads
                setTimeout(() => AOS.refresh(), 100);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        loadServices();
    }, []);

    const categories = ['All', ...new Set(services.map(service => service.category))];

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        if (category === 'All') {
            setFilteredServices(services);
        } else {
            setFilteredServices(services.filter(service => service.category === category));
        }
        //  refresh animations when filtering changes
        setTimeout(() => AOS.refresh(), 100);
    };

    const handleShowDetails = (serviceId) => {
        navigate(`/services/${serviceId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading services...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center text-red-600">
                    <h2 className="text-2xl font-bold mb-4">Error Loading Services</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className=" min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div data-aos="fade-down" className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Pet Care Services</h1>
                    <p className="text-lg text-gray-600">Professional winter care services for your beloved pets</p>
                </div>

                {/* Category Filter */}
                <div data-aos="fade-up" className="flex flex-wrap justify-center gap-2 mb-8">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => handleCategoryFilter(category)}
                            className={`btn-gradient px-4 py-2 rounded-full transition ${selectedCategory === category ? '' : 'opacity-85'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map((service, index) => (
                        <div
                            key={service.serviceId}
                            data-aos="zoom-in-up"
                            data-aos-delay={(index % 3) * 100} // small staggered delay
                            className="card-gradient rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <div className="h-40 bg-gray-200 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.serviceName}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://placehold.co/400x200?text=Image+Not+Available";
                                    }}
                                />
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{service.serviceName}</h3>
                                </div>

                                <div className="flex justify-between mb-3">
                                    <p className="font-medium text-gray-900 text-sm">Provider: {service.providerName}</p>
                                    <div className="flex text-right">
                                        <span className="text-yellow-400">★</span>
                                        <span className="ml-1 text-sm text-gray-600">{service.rating}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={() => handleShowDetails(service.serviceId)}
                                        className='btn-gradient text-white px-4 py-2 rounded hover:opacity-90 transition'
                                    >
                                        View Details
                                    </button>
                                    <p className="text-xl font-bold text-blue-600">${service.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredServices.length === 0 && (
                    <div className="text-center py-12" data-aos="fade-up">
                        <p className="text-gray-500 text-lg">No services found for the selected category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Services;
