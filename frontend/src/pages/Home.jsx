import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid';

// Add animation classes
const fadeInUp = "opacity-0 translate-y-8 transition-all duration-700 ease-out";
const fadeInUpActive = "opacity-100 translate-y-0";
const fadeInLeft = "opacity-0 -translate-x-8 transition-all duration-700 ease-out";
const fadeInLeftActive = "opacity-100 translate-x-0";
const fadeInRight = "opacity-0 translate-x-8 transition-all duration-700 ease-out";
const fadeInRightActive = "opacity-100 translate-x-0";

const carouselTexts = [
  {
    title: <>Handling Arrangements for<br />the <span className="text-[#6266ea]">Loss</span> of a Loved One</>,
    subtitle: "A comprehensive guide to help you through this difficult time, providing step-by-step assistance for all necessary arrangements."
  },
  {
    title: <>All <span className="text-[#6266ea]">Resources</span><br />on One Website</>,
    subtitle: "Access everything you need in one place - from legal documents to emotional support resources, making the process more manageable."
  },
  {
    title: <>Navigate the <span className="text-[#6266ea]">Process</span><br />Together</>,
    subtitle: "Step-by-step assistance through every decision and document."
  }
];

export default function Home() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [isIntersecting, setIsIntersecting] = useState({});

  const nextSlide = () => {
    setIsTextVisible(false);
    setTimeout(() => {
      setCurrentTextIndex((prev) => (prev + 1) % carouselTexts.length);
      setIsTextVisible(true);
    }, 500);
  };

  const prevSlide = () => {
    setIsTextVisible(false);
    setTimeout(() => {
      setCurrentTextIndex((prev) => (prev - 1 + carouselTexts.length) % carouselTexts.length);
      setIsTextVisible(true);
    }, 500);
  };

  useEffect(() => {
    const textInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(textInterval);
  }, []);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsIntersecting(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-[500px] sm:min-h-[600px] h-[calc(100vh-64px)]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/ViteSite/GrievingWoman.png")',
            opacity: '0.9',
            filter: 'grayscale(20%) brightness(0.9)',
            mixBlendMode: 'multiply'
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#6266ea]/10 mix-blend-multiply" />
        
        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="h-full flex items-center">
            {/* Text Content */}
            <div 
              className={`w-full transition-opacity duration-500 ${
                isTextVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="max-w-3xl pl-2 sm:pl-8 md:pl-16 lg:pl-20">
                {/* Award Badge */}
                <div className="inline-block mb-4 sm:mb-6">
                  <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-black px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-lg transform hover:scale-105 transition-transform duration-200 animate-pulse">
                    🏆 Award-Winning Checklist
                  </div>
                </div>
                <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#212529] mb-3 sm:mb-4 md:mb-8">
                  {carouselTexts[currentTextIndex].title}
                </h1>
                <div className="h-1 w-12 sm:w-16 md:w-24 bg-gradient-to-r from-[#6266ea] to-[#7c80ee] mb-3 sm:mb-4 md:mb-8 rounded-full shadow-lg" />
                <p className="text-sm sm:text-base md:text-xl text-[#6c757d] max-w-2xl">
                  {carouselTexts[currentTextIndex].subtitle}
                </p>
                <div className="mt-4 sm:mt-6 md:mt-10">
                  <Link
                    to="/signup"
                    className="inline-block px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 border-2 border-[#6266ea] text-[#6266ea] text-sm md:text-base font-medium rounded-md hover:bg-[#6266ea] hover:text-white transition-all duration-200"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
            {carouselTexts.map((_, index) => (
              <div
                key={index}
                className={`h-1 transition-all duration-300 ${
                  index === currentTextIndex 
                    ? 'w-4 sm:w-6 md:w-8 bg-[#6266ea]' 
                    : 'w-1.5 sm:w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Work Section with To-Do List */}
      <div className="max-w-7xl mx-auto py-8 sm:py-12 md:py-16 px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Text Content */}
          <div 
            id="work-text"
            data-animate
            className={`text-center lg:text-left ${fadeInLeft} ${
              isIntersecting['work-text'] ? fadeInLeftActive : ''
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-light text-[#212529] mb-4 sm:mb-6 leading-tight">
              We've Done the <span className="text-[#6266ea] font-normal">Work</span> for You
            </h2>
            <p className="text-base sm:text-lg text-[#6c757d] max-w-xl mx-auto lg:mx-0">
              Our award-winning checklist system guides you through every step of the process, ensuring nothing is overlooked during this difficult time.
            </p>
          </div>

          {/* To-Do List Card */}
          <div 
            id="todo-card"
            data-animate
            className={`bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-[#6266ea]/10 relative overflow-hidden ${fadeInRight} ${
              isIntersecting['todo-card'] ? fadeInRightActive : ''
            }`}
          >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#6266ea]/5 to-[#7c80ee]/5 rounded-full blur-2xl transform -translate-x-12 -translate-y-12"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#6266ea]/5 to-[#7c80ee]/5 rounded-full blur-xl transform translate-x-6 translate-y-6"></div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#6266ea] flex items-center">
                  <span className="mr-2">To-Do List</span>
                  <span className="text-xs bg-gradient-to-r from-[#6266ea] to-[#7c80ee] text-white px-2 py-1 rounded-full">
                    Smart Guide
                  </span>
                </h3>
              </div>
              <ul className="space-y-2 sm:space-y-3 md:space-y-4">
                {[
                  { text: 'Transport & Body Care', link: '/learn/body-transportation' },
                  { text: 'Understanding Final Wishes', link: '/learn/determining-wishes' },
                  { text: 'Remains & Documentation', link: '/learn/understanding-remains-options' },
                  { text: 'Locating the Will', link: '/learn/finding-will' }
                ].map((item, itemIndex) => (
                  <Link 
                    key={itemIndex} 
                    to={item.link}
                    className="flex items-center text-sm sm:text-base text-[#6c757d] hover:text-[#6266ea] transition-all duration-200 transform hover:translate-x-1 hover:shadow-sm rounded-lg p-2 group"
                  >
                    <span className="mr-2 text-[#6266ea] group-hover:translate-x-1 transition-transform duration-200">→</span>
                    {item.text}
                  </Link>
                ))}
              </ul>
            </div>
            {/* Enhanced Checklist Link Icon */}
            <Link 
              to="/checklist" 
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 group hover:scale-105 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-[#6266ea]/10 to-[#7c80ee]/10 rounded-full p-3 sm:p-4 group-hover:from-[#6266ea]/20 group-hover:to-[#7c80ee]/20 transition-all duration-300">
                <ClipboardDocumentListIcon className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-[#6266ea] transform group-hover:rotate-3 transition-transform duration-300" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div className="relative bg-gradient-to-br from-[#6266ea] to-[#7c80ee] py-12 sm:py-20 md:py-28 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 rounded-full bg-white/5 blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div 
            id="resources-header"
            data-animate
            className={`text-center ${fadeInUp} ${
              isIntersecting['resources-header'] ? fadeInUpActive : ''
            }`}
          >
            <div className="inline-block mb-3">
              <div className="flex items-center justify-center space-x-2">
                <div className="h-0.5 w-4 sm:w-6 bg-white/30"></div>
                <span className="text-white/90 uppercase text-xs sm:text-sm tracking-wider font-medium">Explore Our</span>
                <div className="h-0.5 w-4 sm:w-6 bg-white/30"></div>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 sm:mb-6 tracking-tight">
              Comprehensive <span className="font-normal relative inline-block">
                Resources
                <span className="absolute bottom-0 left-0 w-full h-1 bg-white/20 rounded-full"></span>
                <span className="absolute -right-4 -top-4 w-8 h-8 bg-white/10 rounded-full blur-lg"></span>
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Access our extensive collection of resources designed to support you through every aspect of this journey.
            </p>
            <div className="mt-6 sm:mt-8">
              <div className="inline-flex items-center space-x-2 text-white/90 text-xs sm:text-sm">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Updated resources available 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {/* Financial Resources */}
            <div 
              id="financial-card"
              data-animate
              className={`bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#6266ea]/10 ${fadeInUp} ${
                isIntersecting['financial-card'] ? fadeInUpActive : ''
              }`}
            >
              <div className="flex items-center mb-6">
                <div className="bg-[#6266ea]/10 rounded-full p-3">
                  <svg className="w-6 h-6 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#212529] ml-4">Financial Assistance</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-[#6c757d] hover:text-[#6266ea] transition-colors">
                  <span className="mr-2">•</span>
                  Government Benefits
                </li>
                <li className="flex items-center text-[#6c757d] hover:text-[#6266ea] transition-colors">
                  <span className="mr-2">•</span>
                  Insurance Claims
                </li>
                <li className="flex items-center text-[#6c757d] hover:text-[#6266ea] transition-colors">
                  <span className="mr-2">•</span>
                  Funeral Cost Support
                </li>
              </ul>
              <Link to="/financial-help" className="inline-block mt-6 text-[#6266ea] hover:text-[#4232c2] font-medium">
                Learn More →
              </Link>
            </div>

            {/* Legal Resources */}
            <div 
              id="legal-card"
              data-animate
              className={`bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#6266ea]/10 ${fadeInUp} ${
                isIntersecting['legal-card'] ? fadeInUpActive : ''
              } delay-200`}
            >
              <div className="flex items-center mb-6">
                <div className="bg-[#6266ea]/10 rounded-full p-3">
                  <svg className="w-6 h-6 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#212529] ml-4">Legal Guidance</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-[#6c757d] hover:text-[#6266ea] transition-colors">
                  <span className="mr-2">•</span>
                  Estate Planning
                </li>
                <li className="flex items-center text-[#6c757d] hover:text-[#6266ea] transition-colors">
                  <span className="mr-2">•</span>
                  Probate Process
                </li>
                <li className="flex items-center text-[#6c757d] hover:text-[#6266ea] transition-colors">
                  <span className="mr-2">•</span>
                  Legal Documentation
                </li>
              </ul>
              <Link to="/legal-help" className="inline-block mt-6 text-[#6266ea] hover:text-[#4232c2] font-medium">
                Learn More →
              </Link>
            </div>

            {/* Emotional Support */}
            <div 
              id="emotional-card"
              data-animate
              className={`bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#6266ea]/10 ${fadeInUp} ${
                isIntersecting['emotional-card'] ? fadeInUpActive : ''
              } delay-400`}
            >
              <div className="flex items-center mb-6">
                <div className="bg-[#6266ea]/10 rounded-full p-3">
                  <svg className="w-6 h-6 text-[#6266ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#212529] ml-4">Emotional Support</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-[#6c757d] hover:text-[#6266ea] transition-colors">
                  <span className="mr-2">•</span>
                  Grief Counseling
                </li>
                <li className="flex items-center text-[#6c757d] hover:text-[#6266ea] transition-colors">
                  <span className="mr-2">•</span>
                  Support Groups
                </li>
                <li className="flex items-center text-[#6c757d] hover:text-[#6266ea] transition-colors">
                  <span className="mr-2">•</span>
                  Mental Health Resources
                </li>
              </ul>
              <Link to="/emotional-support" className="inline-block mt-6 text-[#6266ea] hover:text-[#4232c2] font-medium">
                Learn More →
              </Link>
            </div>
          </div>

          {/* Additional Resources Button */}
          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <Link
              to="/resources"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-[#6266ea] text-[#6266ea] text-sm sm:text-base font-medium rounded-md hover:bg-[#6266ea] hover:text-white transition-all duration-200"
            >
              View All Resources
            </Link>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="max-w-7xl mx-auto py-8 sm:py-12 md:py-20 px-3 sm:px-6 lg:px-8">
        <div 
          id="support-section"
          data-animate
          className={`bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-[#6266ea]/10 ${fadeInUp} ${
            isIntersecting['support-section'] ? fadeInUpActive : ''
          }`}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-light text-[#212529] mb-4">
              24/7 <span className="text-[#6266ea] font-normal">Support</span>
            </h2>
            <p className="text-lg text-[#6c757d] max-w-2xl mx-auto">
              Our team of experts is here to help you navigate through this difficult time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Expert Guidance',
                description: 'Professional advice when you need it most'
              },
              {
                title: 'Community Support',
                description: 'Connect with others who understand'
              },
              {
                title: 'Legal Resources',
                description: 'Access to legal professionals and resources'
              },
              {
                title: 'Crisis Assistance',
                description: '24/7 emergency support services'
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-[#6266ea]/5">
                <h3 className="text-lg font-semibold text-[#212529] mb-2">{item.title}</h3>
                <p className="text-sm text-[#6c757d]">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/support"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#6266ea] text-white text-base font-medium rounded-md hover:bg-[#4232c2] transition-all duration-200"
            >
              Get Support Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 