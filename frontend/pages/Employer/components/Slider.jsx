import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Image as ImageIcon,
  Trash2,
  Upload,
  Loader,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Sliders,
} from 'lucide-react';
import API from '../../../src/services/api';

const SliderComponent = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const res = await API.get('/sliders');
      setSliders(res.data);
    } catch (err) {
      setError('Failed to fetch sliders.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError('');
    setSuccess('');

    if (!imageFile) {
      setError('Please select an image file for the slider.');
      setUploading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('status', true);
      data.append('image', imageFile);

      await API.post('/sliders', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess('Slider created successfully!');
      setFormData({ name: '' });
      setImageFile(null);
      fetchSliders();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload slider.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this slider?')) return;
    setActionLoading(id);
    try {
      await API.delete(`/sliders/${id}`);
      setSliders(sliders.filter((item) => item._id !== id));
    } catch (err) {
      alert('Failed to delete slider.');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-8 font-sans"
    >
      {/* Create Slider Form */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg">
        <div className="pb-6 border-b border-slate-100 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#1a237e] tracking-tight">
              Hero Slider Management
            </h2>
            <p className="text-slate-500 text-sm mt-0.5">
              Add and configure banner slides displayed on the home page carousel.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-medium flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Slider Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Summer Hiring Banner"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition-all shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Banner Image File *
              </label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={handleFileChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-500 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer"
              />
            </div>

          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              {uploading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Upload Slider</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Slider List Grid */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg">
        <div className="flex justify-between items-center pb-6 border-b border-slate-100 mb-8">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Active Sliders
            </h3>
            <p className="text-slate-500 text-sm mt-0.5">
              Overview of all slider banners currently stored in the system.
            </p>
          </div>
          <span className="px-4 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
            Total Sliders: {sliders.length}
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : sliders.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-medium text-sm">No sliders found.</p>
            <p className="text-slate-400 text-xs mt-1">Upload a slider banner above to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sliders.map((slider) => (
              <div
                key={slider._id}
                className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div className="h-44 bg-slate-200 relative overflow-hidden flex items-center justify-center">
                  <img
                    src={slider.image}
                    alt={slider.name}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-lg backdrop-blur-md ${
                      slider.status
                        ? 'bg-emerald-600/80 text-white'
                        : 'bg-slate-800/70 text-slate-300'
                    }`}
                  >
                    {slider.status ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm truncate">{slider.name}</h4>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200/60">
                    <a
                      href={slider.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <span>View Image</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => handleDelete(slider._id)}
                      disabled={actionLoading === slider._id}
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center shadow-sm"
                      title="Delete Slider"
                    >
                      {actionLoading === slider._id ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SliderComponent;