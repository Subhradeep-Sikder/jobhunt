import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  DollarSign,
  Calendar,
  Lock,
  CheckCircle,
  Loader,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../LandingPage/components/Header';
import Footer from '../LandingPage/components/Footer';
import API from '../../src/services/api';

const FindJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState({});
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState('');

  // Check authentication status from localStorage
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  const isAuthenticated = Boolean(token);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e, jobId) => {
    e.stopPropagation();
    if (!isAuthenticated) return;
    setActionLoading(jobId);
    try {
      await API.post('/applications/apply', { jobId });
      setAppliedJobs((prev) => ({ ...prev, [jobId]: true }));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to apply for job');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans relative">
      {/* Top Header */}
      <Header />

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        {/* Page Title & Subtitle */}
        <div className="max-w-7xl mx-auto mb-10 text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Explore Available Opportunities
          </h1>
          <p className="text-slate-600 text-base max-w-xl mx-auto">
            Discover verified career listings posted by top employers and take the next step in your professional journey.
          </p>
        </div>

        {/* Main Container with Auth Blur Protection */}
        <div className="max-w-7xl mx-auto relative min-h-[400px]">
          {/* Unauthenticated Blur Overlay */}
          {!isAuthenticated && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/15 backdrop-blur-md rounded-3xl p-6 text-center">
              <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-slate-100 space-y-4">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Authentication Required</h3>
                <p className="text-slate-500 text-base">
                  You must be signed in to browse listings and apply for career opportunities.
                </p>
                <div className="flex gap-3 pt-2">
                  <a
                    href="/login"
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-base transition-all shadow-md text-center"
                  >
                    Sign In
                  </a>
                  <a
                    href="/signup"
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-sm transition-all text-center"
                  >
                    Register
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Job Listings Grid (Blurred when not authenticated) */}
          <div
            className={`transition-all duration-300 ${
              !isAuthenticated ? 'filter blur-sm select-none pointer-events-none' : ''
            }`}
          >
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <p className="text-slate-600 text-base">No job listings found at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => navigate(`/job/${job._id}`)}
                    className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 cursor-pointer"
                  >
                    <div className="space-y-4">
                      {/* Top Category & Job Type Badges */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="px-3.5 py-1.5 bg-blue-50 text-blue-700 font-bold text-xs rounded-full border border-blue-100">
                          Type: {job.jobType}
                        </span>
                        <span className="px-3.5 py-1.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-full border border-slate-200">
                          Category: {job.category || 'General'}
                        </span>
                      </div>

                      {/* Job Title & Designation */}
                      <div className="space-y-1">
                        <h3 className="text-xl font-extrabold text-slate-900 line-clamp-1 leading-snug">
                          {job.title}
                        </h3>
                        <p className="text-sm font-bold text-blue-600">
                          <span className="text-slate-500 font-normal">Designation:</span> {job.designation}
                        </p>
                      </div>

                      {/* Details Strip: Location, Salary & Deadline */}
                      <div className="space-y-2 pt-1 text-sm">
                        <div className="flex items-center justify-between text-slate-700 flex-wrap gap-2">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <strong className="text-slate-800 font-semibold">Location:</strong> {job.location}
                          </span>
                          <span className="flex items-center gap-1 font-bold text-emerald-600">
                            <DollarSign className="w-4 h-4" />
                            <strong className="text-slate-800 font-semibold">Salary:</strong> {job.salary}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <strong className="text-slate-600 font-semibold">Deadline:</strong> {job.deadline}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{job.description}</p>

                      {/* Skills Section */}
                      {job.skills && job.skills.length > 0 && (
                        <div className="pt-2">
                          <span className="text-xs font-bold text-slate-500 block mb-1.5 uppercase tracking-wider">
                            Required Skills:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200/80"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Apply Button / Action Footer */}
                    <div className="pt-5 border-t border-slate-100">
                      {userRole === 'employer' ? (
                        <p className="text-sm text-slate-400 text-center font-medium py-2">
                          Employers cannot apply for jobs
                        </p>
                      ) : (
                        <button
                          onClick={(e) => handleApply(e, job._id)}
                          disabled={appliedJobs[job._id] || actionLoading === job._id}
                          className={`w-full py-3 rounded-2xl text-base font-bold transition-all flex items-center justify-center gap-2 ${
                            appliedJobs[job._id]
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md cursor-pointer'
                          }`}
                        >
                          {actionLoading === job._id ? (
                            <>
                              <Loader className="w-5 h-5 animate-spin" />
                              <span>Applying...</span>
                            </>
                          ) : appliedJobs[job._id] ? (
                            <>
                              <CheckCircle className="w-5 h-5 text-emerald-600" />
                              <span>Applied Successfully</span>
                            </>
                          ) : (
                            <span>Apply Now</span>
                          )}
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FindJobs;