import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import DocImage1 from '../../assets/OIP (2).webp';
import DocImage2 from '../../assets/OIP (7).webp';
import DocImage3 from '../../assets/OPI.png';
import DocImage4 from '../../assets/OIP (1).webp';

const ExpertVets = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-in-out',
      once: false,   // allow animation every time you scroll
      mirror: true,  // animate on both scroll up and down
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div
          className="text-center mb-12"
          data-aos="fade-up"
          data-aos-once="false"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Meet Our Expert Vets
          </h2>
          <p className="text-lg text-gray-600">
            Our experienced veterinary team is dedicated to your pet's winter health
            and wellbeing
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            data-aos="zoom-in"
            data-aos-delay="100"
            data-aos-once="false"
          >
            <div className="flex flex-col items-center p-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-200 shadow-md mb-4">
                <img
                  src={DocImage1}
                  alt="Dr. Michael Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Dr. Michael Chen
              </h3>
              <p className="text-blue-600 font-medium mb-2">
                Senior Veterinarian
              </p>
              <p className="text-gray-600 text-sm text-center mb-4">
                15+ years specializing in winter pet care and cold weather health
                issues. Expert in canine and feline winter wellness.
              </p>
              <div className="flex items-center justify-between w-full text-sm text-gray-500">
                <span>Experience: 15 years</span>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-gray-600">4.9</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            data-aos="zoom-in"
            data-aos-delay="200"
            data-aos-once="false"
          >
            <div className="flex flex-col items-center p-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-200 shadow-md mb-4">
                <img
                  src={DocImage2}
                  alt="Dr. Sarah Johnson"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Dr. Sarah Johnson
              </h3>
              <p className="text-green-600 font-medium mb-2">
                Pet Nutrition Specialist
              </p>
              <p className="text-gray-600 text-sm text-center mb-4">
                12+ years focusing on winter nutrition and dietary needs for pets.
                Certified in cold weather pet health management.
              </p>
              <div className="flex items-center justify-between w-full text-sm text-gray-500">
                <span>Experience: 12 years</span>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-gray-600">4.8</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            data-aos="zoom-in"
            data-aos-delay="300"
            data-aos-once="false"
          >
            <div className="flex flex-col items-center p-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-200 shadow-md mb-4">
                <img
                  src={DocImage3}
                  alt="Dr. Robert Martinez"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Dr. Robert Martinez
              </h3>
              <p className="text-purple-600 font-medium mb-2">
                Emergency Care Specialist
              </p>
              <p className="text-gray-600 text-sm text-center mb-4">
                10+ years in emergency veterinary medicine with expertise in
                winter-related pet emergencies and cold weather injuries.
              </p>
              <div className="flex items-center justify-between w-full text-sm text-gray-500">
                <span>Experience: 10 years</span>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-gray-600">4.9</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            data-aos="zoom-in"
            data-aos-delay="400"
            data-aos-once="false"
          >
            <div className="flex flex-col items-center p-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-200 shadow-md mb-4">
                <img
                  src={DocImage4}
                  alt="Dr. Emily Davis"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Dr. Emily Davis
              </h3>
              <p className="text-orange-600 font-medium mb-2">
                Behavioral Specialist
              </p>
              <p className="text-gray-600 text-sm text-center mb-4">
                8+ years specializing in pet behavior during seasonal changes and
                winter anxiety management for pets.
              </p>
              <div className="flex items-center justify-between w-full text-sm text-gray-500">
                <span>Experience: 8 years</span>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-gray-600">4.7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertVets;
