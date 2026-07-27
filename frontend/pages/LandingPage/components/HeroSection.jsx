import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Sparkles, Building, TrendingUp } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  const logos = ["NYKAA", "bookmyshow", "Apollo Munich", "unacademy", "SWIGGY", "paisabazaar", "clearTax"];

  return (
    <section className="bg-[#f8fafc] font-sans pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Hero Banner */}
        <div className="bg-white border border-blue-200 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row items-center justify-between px-8 md:px-14 py-10 md:py-8 min-h-[420px] gap-8">
          <div className="max-w-xl space-y-6 text-center md:text-left z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Your <span className="text-blue-600">Career</span> Journey <br />
              Starts Here – Explore <br />
              <span className="text-blue-600">JobHunt Now!</span>
            </h1>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Discover verified career listings posted by top employers and take the next step in your professional journey.
            </p>
            <div>
              <button 
                onClick={() => navigate('/find-jobs')}
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md cursor-pointer"
              >
                Find Jobs Today
              </button>
            </div>
          </div>

          {/* Hero Placeholder Banner */}
          <div className="w-full md:w-[420px] h-72 md:h-[340px] bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-white border border-blue-400/30 shadow-lg relative shrink-0 overflow-hidden space-y-4">
            {/* Background Decorative Graphic Elements */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-400/20 rounded-full blur-xl pointer-events-none" />

            <div className="w-14 h-14 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
              <Briefcase className="w-7 h-7 text-white stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <span className="text-3xl font-black tracking-tight block">
                job<span className="text-blue-200">hunt</span>
              </span>
              <p className="text-xs text-blue-100 font-medium">
                Connecting top talent with leading companies worldwide.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <span className="px-3 py-1 bg-white/15 backdrop-blur-md text-[11px] font-bold rounded-lg flex items-center gap-1 border border-white/10">
                <Sparkles className="w-3 h-3 text-amber-300" /> 100% Verified
              </span>
              <span className="px-3 py-1 bg-white/15 backdrop-blur-md text-[11px] font-bold rounded-lg flex items-center gap-1 border border-white/10">
                <TrendingUp className="w-3 h-3 text-emerald-300" /> High Growth
              </span>
            </div>
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