import React from 'react';

const TrustedPlatform = () => {
  return (
    <section className="bg-[#f8fafc] py-16 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Join Thousands Who Found Success Through <span className="text-blue-600">JobHunt’s</span> Trusted Platform.
            </h2>
            
            <p>
              Job Hunt Placement is a premier recruitment agency based in Siliguri, West Bengal, with over 20 years of experience in providing comprehensive manpower solutions. We specialize in connecting skilled professionals with leading companies both in India and abroad, across a diverse range of industries. Our expertise spans sectors such as IT, healthcare, hospitality, retail, engineering, BPO, and more, ensuring that we meet the unique staffing needs of every client.
            </p>
            <p>
              Our mission is to make the recruitment process seamless and efficient for both employers and job seekers. We understand that finding the right job or the right candidate can be challenging, and that's where our personalized services come into play. Our team of experienced consultants works closely with businesses to understand their requirements and with job seekers to match them with opportunities that align with their skills and aspirations.
            </p>
            <p>
              At Job Hunt Placement, we are committed to fostering long-term relationships based on trust, reliability, and professionalism. Our extensive network and industry knowledge help us deliver high-quality placements that contribute to the growth and success of both individuals and organizations.
            </p>
            <p className="font-medium text-slate-900">
              As a trusted partner in the recruitment industry, we continue to build on our legacy of success, ensuring that our clients and candidates achieve their goals. Join us today and experience the Job Hunt Placement difference!
            </p>
          </div>

          {/* Right Media & Stats Grid */}
          <div className="lg:col-span-5 space-y-6">
            {/* Image Placeholder */}
            <div className="w-full h-64 bg-slate-200 rounded-2xl border border-slate-300 flex items-center justify-center shadow-sm overflow-hidden">
              <span className="text-slate-500 font-medium">[ Team Image ]</span>
            </div>

            {/* Stat Counters */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-600 text-white p-6 rounded-2xl text-center shadow-md flex flex-col justify-center">
                <span className="text-3xl sm:text-4xl font-extrabold block mb-1">2k+</span>
                <span className="text-sm font-semibold block mb-2">Happy Candidates</span>
                <span className="text-[11px] text-blue-100 leading-tight">Successfully placed 2,000 candidates in rewarding career opportunities.</span>
              </div>

              <div className="bg-[#0f172a] text-white p-6 rounded-2xl text-center shadow-md flex flex-col justify-center">
                <span className="text-3xl sm:text-4xl font-extrabold block mb-1">1.5k+</span>
                <span className="text-sm font-semibold block mb-2">Complete Placement</span>
                <span className="text-[11px] text-slate-300 leading-tight">Successfully achieved 1,500 job placements with trusted expertise.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustedPlatform;