import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  ArrowLeft,
  CheckCircle,
  Loader,
  Building2,
} from 'lucide-react';
import Header from '../LandingPage/components/Header';
import Footer from '../LandingPage/components/Footer';
import API from '../../src/services/api';

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applied, setApplied] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);

  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  const isAuthenticated = Boolean(token);

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      const res = await API.get(`/jobs/${jobId}`);
      setJob(res.data);
    } catch (err) {
      setError('Failed to load job details.');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setApplyLoading(true);
    try {
      await API.post('/applications/apply', { jobId });
      setApplied(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit application.');
    } finally {
      setApplyLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <Header />

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Job Listings</span>
          </button>

          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : error ? (
            <div className="bg-white border border-red-200 rounded-3xl p-8 text-center text-red-600 font-medium shadow-sm">
              {error}
            </div>
          ) : job ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-100 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 font-semibold text-xs rounded-full">
                      {job.jobType}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 font-semibold text-xs rounded-full">
                      {job.category}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {job.title}
                  </h1>
                  <p className="text-sm font-bold text-blue-600 uppercase tracking-wide">
                    {job.designation}
                  </p>
                </div>

                {job.image && (
                  <img
                    src={job.image}
                    alt={job.title}
                    className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shadow-sm"
                  />
                )}
              </div>

              {/* Key Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Location
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Salary Range
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                    <DollarSign className="w-3.5 h-3.5 shrink-0" />
                    <span>{job.salary}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Deadline
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{job.deadline}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Posted By
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                    <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">{job.createdBy?.fullName || 'Employer'}</span>
                  </div>
                </div>
              </div>

              {/* Skills Required */}
              {job.skills && job.skills.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Skills Required
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-50 text-blue-700 font-semibold text-xs rounded-xl border border-blue-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Description */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Full Job Description
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>

              {/* Application Action Bar */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                {userRole === 'employer' ? (
                  <p className="text-xs text-slate-400 font-medium">
                    Employers view-only mode for job details
                  </p>
                ) : (
                  <button
                    onClick={handleApply}
                    disabled={applied || applyLoading}
                    className={`px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
                      applied
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                        : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                    }`}
                  >
                    {applyLoading ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : applied ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>Application Submitted</span>
                      </>
                    ) : (
                      <span>Apply For This Position</span>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobDetails;