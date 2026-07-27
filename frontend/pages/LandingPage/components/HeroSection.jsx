import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const logos = ["NYKAA", "bookmyshow", "Apollo Munich", "unacademy", "SWIGGY", "paisabazaar", "clearTax"];

  return (
    <section className="bg-[#f8fafc] font-sans pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Banner */}
        <div className="bg-white border border-blue-200 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12 md:py-6 min-h-[420px]">
          <div className="max-w-xl space-y-6 text-center md:text-left z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Your <span className="text-blue-600">Career</span> Journey <br />
              Starts Here – Explore <br />
              <span className="text-blue-600">JobHunt Now!</span>
            </h1>
            <div>
              <button 
                onClick={() => navigate('/find-jobs')}
                className="px-8 py-3.5 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-xl transition-all duration-200 shadow-sm"
              >
                Find Jobs Today
              </button>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="w-full md:w-96 h-72 md:h-96 mt-8 md:mt-0 bg-gradient-to-t from-blue-100 to-slate-100 rounded-2xl flex items-center justify-center border border-slate-200 shadow-inner">
            <span className="text-slate-400 font-medium text-sm">[ Image  ]</span>
          </div>
        </div>

        {/* Company Logos Strip */}
        <div className="mt-12 py-6 border-y border-slate-200/60 flex flex-wrap items-center justify-around gap-8 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          {logos.map((logo, index) => (
            <span key={index} className="text-lg md:text-xl font-bold tracking-wider text-slate-600">
              {logo}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HeroSection;