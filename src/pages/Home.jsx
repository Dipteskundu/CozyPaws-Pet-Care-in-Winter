import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router";
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroSwiper from '../components/HeroSwiper/HeroSwiper';
import ExpertVets from '../components/ExpertSection/ExpertVets';

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Initialize AOS so animations run every time elements enter the viewport
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-in-out',
      once: false,    // <= animate more than once
      mirror: true,   // <= animate elements when scrolling up as well
      offset: 120,
    });

    // Optional: refresh AOS on window load/resize in case layout changes
    const handleRefresh = () => AOS.refresh();
    window.addEventListener('resize', handleRefresh);
    window.addEventListener('load', handleRefresh);
    return () => {
      window.removeEventListener('resize', handleRefresh);
      window.removeEventListener('load', handleRefresh);
    };
  }, []);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetch('/pet-care.json');
        if (!response.ok) throw new Error('Failed to load services');
        const data = await response.json();
        setServices(data.slice(0, 6));
      } catch (err) {
        console.error('Error loading services:', err);
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  const handleShowDetails = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <div className="page-gradient min-h-screen">
      <HeroSwiper />

      {/* Features Section */}
      <div className="card-gradient py-16" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up" data-aos-once="false">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose CozyPaws?</h2>
            <p className="text-lg text-gray-600">
              We provide comprehensive winter care solutions for your pets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center" data-aos="zoom-in" data-aos-delay="100" data-aos-once="false">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🐕</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Care</h3>
              <p className="text-gray-600">
                Professional pet care providers with years of experience in winter pet care.
              </p>
            </div>

            <div className="text-center" data-aos="zoom-in" data-aos-delay="200" data-aos-once="false">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❄️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Winter Specialized</h3>
              <p className="text-gray-600">
                Specialized services designed specifically for cold weather pet care needs.
              </p>
            </div>

            <div className="text-center" data-aos="zoom-in" data-aos-delay="300" data-aos-once="false">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Loving Service</h3>
              <p className="text-gray-600">
                We treat your pets with the same love and care you would give them.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Services Section */}
      <div className="card-gradient py-16" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4" data-aos="fade-up" data-aos-once="false">
            Featured Services
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8" data-aos="fade-up" data-aos-delay="100" data-aos-once="false">
            Discover our most popular winter care services
          </p>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={service.serviceId}
                  className="card-gradient rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  data-aos-once="false"
                >
                  <div className="h-40 bg-gray-200 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.serviceName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/400x200?text=Image+Not+Available';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {service.serviceName}
                    </h3>
                    <p className="font-medium text-gray-900 text-sm mb-2">
                      Provider: {service.providerName}
                    </p>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => handleShowDetails(service.serviceId)}
                        className="btn-gradient text-white px-4 py-2 rounded hover:opacity-90 transition"
                      >
                        View Details
                      </button>
                      <p className="text-xl font-bold text-blue-600">${service.price}</p>
                    </div>
                    <div className="mt-2 flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-sm text-gray-600">
                        {service.rating?.number || service.rating || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Meet Our Expert Vets Section */}
      <div data-aos="fade-up" data-aos-once="false" id="vets">
        <ExpertVets />
      </div>
    </div>
  );
};

export default Home;
