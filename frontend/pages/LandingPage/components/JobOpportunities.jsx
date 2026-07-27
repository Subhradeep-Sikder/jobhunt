import React, { useState } from 'react';
import { Briefcase, Clock } from 'lucide-react';

const JobOpportunities = () => {
  const [activeTab, setActiveTab] = useState('Marketing & Sale');

  const categories = ["Management", "Marketing & Sale", "Design", "Retail & Products", "IT & Engineering", "Finance"];

  const jobs = Array(6).fill({
    company: "Hotel Udaan, Darjeeling",
    role: "Sr. Graphics Designer",
    department: "Design & Architecture",
    type: "Full-Time",
    desc: "Lorem ipsum dolor sit amet consectetur. A ornare nibh at faucibus leo sit. Nunc habitant pretium tincidunt praesent diam. Risus sit urna nulla pellentesque velit.",
    skills: ["Design", "Adobe Photoshop", "Adobe Illustrator"],
    salary: "Salary Up to 15K"
  });

  return (
    <section className="bg-[#f8fafc] py-16 font-sans border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Explore New <span className="text-blue-600">Opportunities</span>
          </h2>
          <p className="text-slate-600 text-sm mt-1">Launch your professional future today with top employers hiring on JobHunt.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all border ${
                activeTab === cat
                  ? "bg-blue-50 border-blue-500 text-blue-600 font-semibold shadow-sm"
                  : "bg-white border-slate-300 text-slate-700 hover:border-slate-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              
              <div className="space-y-3">
                {/* Company Logo & Title */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-xs">
                    LOGO
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{job.company}</h4>
                    <span className="text-slate-500 text-xs block">{job.role}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-blue-600" /> {job.department}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-blue-600" /> {job.type}</span>
                </div>

                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                  {job.desc}
                </p>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded text-[11px] font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button className="px-5 py-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg text-sm font-semibold transition-colors">
                  Apply Now
                </button>
                <span className="text-xs font-bold text-slate-800">{job.salary}</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default JobOpportunities;