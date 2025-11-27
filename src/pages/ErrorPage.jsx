import React, { useEffect } from 'react';
import { Link } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ErrorPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div 
        className="text-center max-w-3xl mx-auto"
        data-aos="fade-down"
        data-aos-delay="1000"
      >
        <h1 className="text-9xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          404
        </h1>
        
        <div 
          className="relative mb-8"
          data-aos="fade-up"
          data-aos-delay="1000"
        >
          <div className="w-32 h-32 mx-auto">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              className="w-full h-full animate-bounce"
            >
              <path 
                d="M12 8L12 12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                stroke="url(#gradient)" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="gradient" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366F1" />
                  <stop offset="0.5" stopColor="#A855F7" />
                  <stop offset="1" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        
        <h2 
          className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          data-aos="fade-up"
          data-aos-delay="1000"
        >
          Oops! Page Not Found
        </h2>
        
        <p 
          className="text-lg text-gray-600 mb-8"
          data-aos="fade-up"
          data-aos-delay="1000"
        >
          The page you're looking for doesn't exist or has been moved.
          <br />
          Our pets might have played with the URL!
        </p>
        
        <Link 
          to="/"
          className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium text-lg transition-transform duration-1000 transform hover:scale-105 hover:shadow-lg"
          data-aos="zoom-in"
          data-aos-delay="1000"
        >
          Go to Home
        </Link>
      </div>
      
      {/* Animated pet paws */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-indigo-500">
              <path d="M12,17.5C10.15,17.5 8.42,16.44 6.94,15.18C5.56,14 4.5,12.81 4.5,12C4.5,11.19 5.56,10 6.94,8.82C8.42,7.56 10.15,6.5 12,6.5C13.85,6.5 15.58,7.56 17.06,8.82C18.44,10 19.5,11.19 19.5,12C19.5,12.81 18.44,14 17.06,15.18C15.58,16.44 13.85,17.5 12,17.5M12,8.5C11.15,8.5 10.42,8.97 9.87,9.59C9.27,10.26 9,11 9,11.5C9,12 9.27,12.74 9.87,13.41C10.42,14.03 11.15,14.5 12,14.5C12.85,14.5 13.58,14.03 14.13,13.41C14.73,12.74 15,12 15,11.5C15,11 14.73,10.26 14.13,9.59C13.58,8.97 12.85,8.5 12,8.5M21,10.5C21,10.5 19,5.06 12,5.06C5,5.06 3,10.5 3,10.5C3,10.5 5,15.94 12,15.94C19,15.94 21,10.5 21,10.5M12,7C14.76,7 17,8.79 17,11C17,13.21 14.76,15 12,15C9.24,15 7,13.21 7,11C7,8.79 9.24,7 12,7Z" />
            </svg>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-100px) rotate(180deg);
          }
          100% {
            transform: translateY(-200px) rotate(360deg) scale(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;