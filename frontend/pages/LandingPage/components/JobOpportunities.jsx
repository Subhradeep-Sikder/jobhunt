import React, { useState, useEffect } from 'react';
import { MapPin, DollarSign, Loader, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../../../src/services/api';

const JobOpportunities = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      console.log('Error loading jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", "Management", "Design", "Marketing & Sale", "IT & Engineering", "Finance"];

  const filteredJobs = activeTab === 'All' 
    ? jobs 
    : jobs.filter(j => j.category?.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <section className="bg-[#f8fafc] py-16 font-sans border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Explore New <span className="text-blue-600">Opportunities</span>
          </h2>
          <p className="text-slate-600 text-base mt-1">Launch your professional future today with top employers hiring on JobHunt.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all border cursor-pointer ${
                activeTab === cat
                  ? "bg-blue-50 border-blue-500 text-blue-600 shadow-sm"
                  : "bg-white border-slate-300 text-slate-700 hover:border-slate-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-slate-600 text-base">No job openings found in this category.</p>
          </div>
        ) : (
          /* Job Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.slice(0, 6).map((job) => (
              <div 
                key={job._id} 
                onClick={() => navigate(`/job/${job._id}`)}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 cursor-pointer"
              >
                
                <div className="space-y-4">
                  {/* Badges: Job Type & Category */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="px-3.5 py-1.5 bg-blue-50 text-blue-700 font-bold text-xs rounded-full border border-blue-100">
                      Type: {job.jobType}
                    </span>
                    <span className="px-3.5 py-1.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-full border border-slate-200">
                      Category: {job.category || 'General'}
                    </span>
                  </div>

                  {/* Title & Designation */}
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-slate-900 text-xl line-clamp-1 leading-snug">{job.title}</h4>
                    <span className="text-blue-600 font-bold text-sm block">
                      <strong className="text-slate-500 font-normal">Designation:</strong> {job.designation}
                    </span>
                  </div>

                  {/* Location & Deadline */}
                  <div className="space-y-1.5 text-sm text-slate-600">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <strong className="text-slate-800 font-semibold">Location:</strong> {job.location}
                      </span>
                      <span className="flex items-center gap-1 font-bold text-emerald-600">
                        <DollarSign className="w-4 h-4" />
                        <strong className="text-slate-800 font-semibold">Salary:</strong> {job.salary}
                      </span>
                    </div>

                    {job.deadline && (
                      <div className="flex items-center gap-1.5 text-slate-500 font-medium pt-0.5">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <strong className="text-slate-600 font-semibold">Deadline:</strong> {job.deadline}
                      </div>
                    )}
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                    {job.description}
                  </p>

                  {/* Skill Pills */}
                  {job.skills && job.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {job.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-xl text-xs font-semibold border border-slate-200/80">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/job/${job._id}`);
                    }}
                    className="px-6 py-2.5 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl text-sm font-bold transition-colors cursor-pointer"
                  >
                    View & Apply
                  </button>
                  <span className="text-sm font-extrabold text-emerald-600 flex items-center gap-0.5">
                    <DollarSign className="w-4 h-4" />
                    {job.salary}
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default JobOpportunities;