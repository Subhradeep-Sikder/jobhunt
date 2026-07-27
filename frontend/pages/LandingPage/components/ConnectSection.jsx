import React from 'react';

const ConnectSection = () => {
  return (
    <section className="bg-[#f8fafc] py-16 font-sans border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Description & Bio */}
          <div className="lg:col-span-7 space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              99% Placement Success Rate – <span className="text-blue-600">Trust JobHunt’s Proven Network of 1000+ Hiring Partners Across Industries!</span>
            </h2>
            
            <p>
              Job Hunt Placement stands out as a top-tier recruitment agency in Siliguri, providing unmatched staffing solutions both in India and abroad. With over 20 years of experience, we have built a reputation for connecting skilled professionals with leading companies across diverse industries, including IT, healthcare, engineering, retail, and more.
            </p>
            <p>
              Our expert team understands the evolving needs of businesses and job seekers, ensuring that every candidate is matched with the right opportunity. Whether you are a job seeker looking for your next career move or an employer in need of quality talent, Job Hunt Placement offers personalized services to cater to your specific needs.
            </p>
            <p>
              Our vast network and industry knowledge enable us to provide exceptional manpower services, ensuring that businesses can find the best talent to drive their growth. At Job Hunt Placement, we prioritize professionalism, trust, and long-term partnerships with both candidates and employers.
            </p>
          </div>

          {/* Right Lead Capture Form */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-blue-100 p-8 rounded-3xl shadow-lg space-y-5">
              <h3 className="text-2xl font-bold text-center text-slate-900">
                Let’s Connect for <br />
                <span className="text-blue-600">Success!</span>
              </h3>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 bg-slate-50/50" 
                />
                <input 
                  type="tel" 
                  placeholder="Mobile Number" 
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 bg-slate-50/50" 
                />
                <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 bg-slate-50/50 text-slate-500">
                  <option value="">Select Remarks</option>
                  <option value="job_seeker">Looking for a Job</option>
                  <option value="employer">Hiring Talent</option>
                  <option value="other">General Inquiry</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Location" 
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 bg-slate-50/50" 
                />
                <textarea 
                  rows="2" 
                  placeholder="Message" 
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 bg-slate-50/50 resize-none" 
                />
                
                <button 
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-md"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ConnectSection;