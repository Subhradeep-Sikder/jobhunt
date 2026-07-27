import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Loader,
  ArrowLeft,
} from 'lucide-react';
import API from '../../../src/services/api';

const AddJobForm = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    designation: '',
    salary: '',
    jobType: '',
    category: '',
    deadline: '',
    location: '',
    skills: '',
    description: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (imageFile) {
        data.append('image', imageFile);
      }

      await API.post('/jobs', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess(true);
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create job posting');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-2xl w-full text-center border border-slate-100 mx-auto font-sans">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Job Posted Successfully!</h2>
        <p className="text-slate-600 text-sm">Your job listing is now live on the platform.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-lg font-sans"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-[#1a237e] tracking-tight">
            Add Job Details
          </h2>
          <p className="text-slate-500 text-sm mt-0.5">
            Fill in the fields below to publish a new opening for applicants.
          </p>
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 p-2 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Job Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter Job Title (Like Hotel Udaan Designer Team)"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition-all shadow-sm"
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Designation *
            </label>
            <input
              type="text"
              name="designation"
              required
              value={formData.designation}
              onChange={handleInputChange}
              placeholder="Designation (Like Sr. Graphic Designer)"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition-all shadow-sm"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Salary *
            </label>
            <input
              type="text"
              name="salary"
              required
              value={formData.salary}
              onChange={handleInputChange}
              placeholder="Salary (Like 15k)"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition-all shadow-sm"
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Job Type *
            </label>
            <input
              type="text"
              name="jobType"
              required
              value={formData.jobType}
              onChange={handleInputChange}
              placeholder="Job Type (Like Full-Time)"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition-all shadow-sm"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Category *
            </label>
            <input
              type="text"
              name="category"
              required
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Category (Like Design & Architecture)"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition-all shadow-sm"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Deadline *
            </label>
            <input
              type="text"
              name="deadline"
              required
              value={formData.deadline}
              onChange={handleInputChange}
              placeholder="Deadline (Like 22 December 2025)"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition-all shadow-sm"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Location (Like Darjeeling, India)"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition-all shadow-sm"
            />
          </div>

          {/* Choose Image */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Choose Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-500 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer"
            />
          </div>

          {/* Skill Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Skill Name
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="Skill Name (Like React, CSS, HTML)"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition-all shadow-sm"
            />
          </div>

          {/* Full Job Details Textarea */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Full Job Details *
            </label>
            <textarea
              name="description"
              required
              rows="5"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Full job details..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 transition-all shadow-sm resize-y"
            ></textarea>
          </div>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <span>Submit</span>
            )}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-sm border border-slate-300 transition-all cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default AddJobForm;