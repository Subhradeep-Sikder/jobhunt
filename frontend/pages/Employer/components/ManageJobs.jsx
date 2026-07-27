import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Trash2,
  Eye,
  Edit,
  Loader,
  Briefcase,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  PlusCircle,
} from 'lucide-react';
import API from '../../../src/services/api';

const ManageJobs = ({ onNavigateToAddJob }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  
  // Dummy toggle status state map for UI representation
  const [toggleStatus, setToggleStatus] = useState({});

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get('/jobs?all=true');
      setJobs(res.data);
      // Initialize dummy toggle status
      const initialStatus = {};
      res.data.forEach((j) => {
        initialStatus[j._id] = true;
      });
      setToggleStatus(initialStatus);
    } catch (err) {
      setError('Failed to fetch job postings.');
    } finally {
      setLoading(false);
    }
  };

  // Dummy toggle handler
  const handleDummyToggle = (id) => {
    setToggleStatus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Real Delete handler calling backend API
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job posting?')) return;
    setActionLoading(id);
    try {
      await API.delete(`/jobs/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      alert('Failed to delete job.');
    } finally {
      setActionLoading(null);
    }
  };

  // Dummy View handler
  const handleDummyView = (job) => {
    alert(`[Dummy Action] View job details:\nTitle: ${job.title}\nDesignation: ${job.designation}`);
  };

  // Dummy Edit handler
  const handleDummyEdit = (job) => {
    alert(`[Dummy Action] Edit job:\nTitle: ${job.title}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 font-sans">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-lg font-sans"
    >
      {/* Card Header & Add New Job Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-100 mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Manage Job Postings
          </h2>
          <p className="text-slate-500 text-sm mt-0.5">
            Review, edit, or delete your active job listings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onNavigateToAddJob && (
            <button
              onClick={onNavigateToAddJob}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Add New Job</span>
            </button>
          )}

          <span className="px-4 py-2 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl border border-blue-100">
            Total: {jobs.length}
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {jobs.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-medium text-sm">No job postings found.</p>
          <p className="text-slate-400 text-xs mt-1">Click "+ Add New Job" above to create one.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider bg-slate-50/80">
                <th className="py-3.5 px-4 rounded-l-xl">Job Title</th>
                <th className="py-3.5 px-4">Designation</th>
                <th className="py-3.5 px-4">Salary</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Job Type</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Deadline</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
                <th className="py-3.5 px-4 text-right rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {jobs.map((job) => (
                <tr key={job._id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Job Title */}
                  <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">
                    {job.title}
                  </td>

                  {/* Designation */}
                  <td className="py-4 px-4 font-semibold text-blue-600 whitespace-nowrap">
                    {job.designation}
                  </td>

                  {/* Salary */}
                  <td className="py-4 px-4 font-bold text-emerald-600 whitespace-nowrap">
                    {job.salary}
                  </td>

                  {/* Category */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-semibold rounded-lg">
                      {job.category}
                    </span>
                  </td>

                  {/* Job Type */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-semibold rounded-lg">
                      {job.jobType}
                    </span>
                  </td>

                  {/* Location */}
                  <td className="py-4 px-4 text-slate-600 font-medium whitespace-nowrap">
                    {job.location}
                  </td>

                  {/* Deadline */}
                  <td className="py-4 px-4 text-slate-500 font-medium whitespace-nowrap">
                    {job.deadline}
                  </td>

                  {/* Action Buttons: Dummy View, Dummy Edit, Real Delete */}
                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* Dummy View Button */}
                      <button
                        onClick={() => handleDummyView(job)}
                        className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer shadow-2xs"
                        title="View Job (Dummy)"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Dummy Edit Button */}
                      <button
                        onClick={() => handleDummyEdit(job)}
                        className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-all cursor-pointer shadow-2xs"
                        title="Edit Job (Dummy)"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      {/* Real Delete Button */}
                      <button
                        onClick={() => handleDelete(job._id)}
                        disabled={actionLoading === job._id}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center shadow-2xs"
                        title="Delete Job Posting (Real)"
                      >
                        {actionLoading === job._id ? (
                          <Loader className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>

                  {/* Dummy Toggle Status Button (Right-most) */}
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleDummyToggle(job._id)}
                      className="inline-flex items-center gap-1 cursor-pointer transition-transform active:scale-95"
                      title="Toggle Status (Dummy)"
                    >
                      {toggleStatus[job._id] ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-full border border-emerald-200">
                          <ToggleRight className="w-4 h-4 text-emerald-600" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-500 font-bold rounded-full border border-slate-200">
                          <ToggleLeft className="w-4 h-4 text-slate-400" /> Inactive
                        </span>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default ManageJobs;