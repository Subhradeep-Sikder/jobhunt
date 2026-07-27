import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Video, ExternalLink, Loader } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import API from '../../src/services/api';

export default function Media() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await API.get('/media');
      setMediaList(res.data);
    } catch (err) {
      console.log('Error loading media:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <Header />

      <main className="flex-grow py-12 px-6 max-w-7xl mx-auto w-full space-y-8">
        {/* Section Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Media & Event Gallery
          </h1>
          <p className="text-slate-500 text-sm">
            Browse our curated promotional photos, success stories, and video presentations.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : mediaList.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-xl mx-auto">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-semibold text-sm">No media items available yet.</p>
            <p className="text-slate-400 text-xs mt-1">Check back soon for new gallery updates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaList.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="h-52 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                        <Video className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 line-clamp-2">
                        {item.name}
                      </span>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-lg">
                    {item.type}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{item.name}</h3>
                    {item.category && (
                      <span className="text-xs font-semibold text-blue-600">
                        {item.category}
                      </span>
                    )}
                  </div>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 pt-2"
                  >
                    <span>View Original Media</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}