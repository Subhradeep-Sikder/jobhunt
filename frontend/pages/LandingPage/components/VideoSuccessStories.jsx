import React from 'react';
import { Play } from 'lucide-react';

const VideoSuccessStories = () => {
  return (
    <section className="bg-[#f8fafc] py-12 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Proven <span className="text-blue-600">Success</span> Stories
          </h2>
          <p className="text-slate-600 text-sm mt-1">Thousands hired through our trusted, high-speed placement system.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, idx) => (
            <div 
              key={idx} 
              className="relative h-72 rounded-2xl overflow-hidden border-2 border-slate-300 shadow-sm bg-slate-800 flex items-center justify-center group cursor-pointer"
            >
              {/* Background Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-800/40 to-transparent z-10" />
              <span className="text-slate-500 font-medium text-xs z-0 px-1.5">[Thumbnail]</span>

              {/* Play Button Overlay */}
              <div className="z-20 w-14 h-14 rounded-full border-2 border-white/80 bg-black/40 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-blue-600 transition-all">
                <Play className="w-6 h-6 fill-current ml-1" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default VideoSuccessStories;