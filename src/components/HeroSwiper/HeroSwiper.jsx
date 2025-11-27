import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useSpring, animated } from "@react-spring/web";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSwiper = () => {
  const [services, setServices] = useState([]);

  //  Remove loading delay — render immediately
  const [loading, setLoading] = useState(false);

  // ⚙️ React Spring (instant transition)
  const fadeIn = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    config: { tension: 210, friction: 26 },
  });

  useEffect(() => {
    // 🪄 Initialize AOS animations
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      offset: 120,
      easing: "ease-in-out",
    });

    // 🔄 Load data from JSON instantly
    fetch("/hero-slider.json")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
        AOS.refresh();
      })
      .catch((err) => console.error("Error loading services:", err));
  }, []);

  return (
    <animated.section
      style={fadeIn}
      className="relative py-16 bg-gradient-to-b from-yellow-50 to-white overflow-hidden"
    >
      {/* Title Section */}
      <div
        className="text-center mb-12 animate__animated animate__fadeInDown"
        data-aos="fade-down"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-500 via-orange-400 to-pink-500 bg-clip-text text-transparent">
          🐾 Winter Care Specials for Your Pet
        </h2>
        <p
          className="text-gray-600 mt-3 text-lg"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Because your furry friend deserves the best this season ✨
        </p>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        spaceBetween={40}
        slidesPerView={1}
        loop={true}
        className="max-w-6xl mx-auto"
      >
        {services.map((service, index) => (
          <SwiperSlide key={service.id}>
            <div
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col md:flex-row items-center overflow-hidden hover:shadow-yellow-200 transition duration-500 border border-yellow-100 animate__animated animate__fadeInUp"
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              data-aos-delay="0"
            >
              {/* Left section */}
              <div className="flex-1 p-8 text-center md:text-left">
                <span
                  className="inline-block bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full mb-3 shadow-sm"
                  data-aos="zoom-in"
                >
                  🐾 {service.tag}
                </span>
                <h3
                  className="text-3xl font-bold text-gray-900 mb-3 leading-snug"
                  data-aos="fade-right"
                >
                  {service.title}
                </h3>
                <p
                  className="text-gray-600 mb-6 text-base"
                  data-aos="fade-up"
                >
                  {service.description}
                </p>
                <button
                  className="btn-gradient px-6 py-2 rounded-full hover:scale-105 transition-transform duration-300 shadow-md animate__animated animate__pulse animate__delay-1s"
                  data-aos="zoom-in"
                >
                  <Link to="/services">Book Now</Link>
                </button>
              </div>

              {/* Right section (image only) */}
              <div
                className="relative flex-1 flex items-center justify-center p-6"
                data-aos="zoom-in"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-72 h-72 object-cover rounded-3xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        <button
          className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 text-yellow-400 hover:text-yellow-600 transition animate__animated animate__fadeInLeft"
          data-aos="fade-left"
        >
          <ChevronLeft size={32} strokeWidth={2.5} />
        </button>
        <button
          className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 text-yellow-400 hover:text-yellow-600 transition animate__animated animate__fadeInRight"
          data-aos="fade-right"
        >
          <ChevronRight size={32} strokeWidth={2.5} />
        </button>
      </Swiper>
    </animated.section>
  );
};

export default HeroSwiper;
