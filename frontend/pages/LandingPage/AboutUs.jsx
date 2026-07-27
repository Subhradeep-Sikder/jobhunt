import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Target, Users, ShieldCheck, ChevronLeft, ChevronRight, Loader, Image as ImageIcon } from 'lucide-react';
import API from '../../src/services/api';

export default function AboutUs() {
  const [sliders, setSliders] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const res = await API.get('/sliders');
      const active = res.data.filter((s) => s.status);
      setSliders(active);
    } catch (err) {
      console.log('Error loading sliders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sliders.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliders.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [sliders]);

  const handleNext = () => {
    if (sliders.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % sliders.length);
  };

  const handlePrev = () => {
    if (sliders.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + sliders.length) % sliders.length);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <Header />

      <main className="flex-grow py-14 px-6 max-w-7xl mx-auto w-full space-y-12">
        {/* Title */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            About <span className="text-blue-600">JobHunt</span>
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Empowering professionals and connecting visionary employers with top-tier global talent.
          </p>
        </div>

        {/* Employer Uploaded Slider Section */}
        <div className="max-w-5xl mx-auto">
          <div className="mb-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Featured Banners & Showcase</h2>
              <p className="text-xs text-slate-500">Real-time banners uploaded by active employers</p>
            </div>
            {sliders.length > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
                  title="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-700" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
                  title="Next Slide"
                >
                  <ChevronRight className="w-4 h-4 text-slate-700" />
                </button>
              </div>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg h-72 sm:h-96 relative flex items-center justify-center">
            {loading ? (
              <Loader className="w-8 h-8 animate-spin text-blue-600" />
            ) : sliders.length > 0 ? (
              <div className="relative w-full h-full">
                <img
                  src={sliders[currentSlide].image}
                  alt={sliders[currentSlide].name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-6 text-white flex justify-between items-end">
                  <div>
                    <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg mb-2 inline-block">
                      Featured Banner
                    </span>
                    <h3 className="text-xl font-extrabold">{sliders[currentSlide].name}</h3>
                  </div>

                  {sliders.length > 1 && (
                    <div className="flex gap-1.5 pb-1">
                      {sliders.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            idx === currentSlide ? 'w-6 bg-blue-500' : 'w-2 bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-400 space-y-3 p-6 text-center">
                <ImageIcon className="w-12 h-12 text-slate-300" />
                <p className="text-sm font-semibold text-slate-600">No sliders uploaded yet</p>
                <p className="text-xs text-slate-400">Employer banner uploads will appear here dynamically.</p>
              </div>
            )}
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-center">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              To simplify career recruitment through intuitive, transparent, and high-speed matching technology.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-center">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">For Candidates</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Discover verified opportunities, directly connect with hiring teams, and advance your career seamlessly.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-center">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">For Employers</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Publish job listings, manage applicants, upload media, and streamline your entire recruitment pipeline.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}