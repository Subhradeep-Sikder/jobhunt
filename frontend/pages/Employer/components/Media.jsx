import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Image as ImageIcon,
  Video,
  Trash2,
  Upload,
  Loader,
  Plus,
  AlertCircle,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import API from '../../../src/services/api';

const Media = () => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  const [formData, setFormData] = useState({
    type: 'image',
    name: '',
    category: '',
    videoLink: '',
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await API.get('/media');
      setMediaList(res.data);
    } catch (err) {
      setError('Failed to fetch media library.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const data = new FormData();
      data.append('type', formData.type);
      data.append('name', formData.name);
      data.append('category', formData.category);

      if (formData.type === 'image') {
        if (!imageFile) {
          setError('Please select an image file to upload.');
          setUploading(false);
          return;
        }
        data.append('image', imageFile);
      } else {
        data.append('videoLink', formData.videoLink);
      }

      await API.post('/media', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess('Media uploaded successfully!');
      setFormData({ type: 'image', name: '', category: '', videoLink: '' });
      setImageFile(null);
      fetchMedia();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload media.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this media item?')) return;
    setActionLoading(id);
    try {
      await API.delete(`/media/${id}`);
      setMediaList(mediaList.filter((item) => item._id !== id));
    } catch (err) {
      alert('Failed to delete media item.');
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
      {/* Upload Form Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg">
        <div className="pb-6 border-b border-slate-100 mb-6">
          <h2 className="text-2xl font-extrabold text-[#1a237e] tracking-tight">
            Media & Gallery Management
          </h2>
          <p className="text-slate-500 text-sm mt-0.5">
            Upload and manage promotional images, banners, or video links for the platform.
          </p>
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
            {/* Media Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Media Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 transition-all shadow-sm cursor-pointer"
              >
                <option value="image">Image File</option>
                <option value="video">Video Link</option>
              </select>
            </div>

            {/* Media Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Media Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Hero Banner 2026"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition-all shadow-sm"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g. Carousel, Promotional, Profile"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition-all shadow-sm"
              />
            </div>

            {/* Conditional File or Video Link Input */}
            {formData.type === 'image' ? (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Choose Image File *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-500 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Video URL Link *
                </label>
                <input
                  type="url"
                  name="videoLink"
                  required
                  value={formData.videoLink}
                  onChange={handleInputChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition-all shadow-sm"
                />
              </div>
            )}
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
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Upload Media</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Media Library Grid Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg">
        <div className="flex justify-between items-center pb-6 border-b border-slate-100 mb-8">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Media Library
            </h3>
            <p className="text-slate-500 text-sm mt-0.5">
              All uploaded images and video references currently saved in the database.
            </p>
          </div>
          <span className="px-4 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
            Total Items: {mediaList.length}
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : mediaList.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-medium text-sm">No media items found.</p>
            <p className="text-slate-400 text-xs mt-1">Upload an image or video above to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaList.map((item) => (
              <div
                key={item._id}
                className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
              >
                {/* Media Preview Header */}
                <div className="h-44 bg-slate-200 relative overflow-hidden flex items-center justify-center">
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-slate-500 space-y-2 p-4 text-center">
                      <Video className="w-10 h-10 text-blue-600" />
                      <span className="text-xs font-semibold text-slate-700 truncate max-w-full">
                        {item.url}
                      </span>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/70 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wider rounded-lg">
                    {item.type}
                  </span>
                </div>

                {/* Details & Actions */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Category:{' '}
                      <span className="font-semibold text-slate-700">
                        {item.category || 'Uncategorized'}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200/60">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <span>View Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={actionLoading === item._id}
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center shadow-sm"
                      title="Delete Media"
                    >
                      {actionLoading === item._id ? (
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

export default Media;