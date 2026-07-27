import React from 'react';
import { UserPlus, Search, FileText, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="w-6 h-6 text-white" />,
      title: "Create Your Profile",
      desc: "Sign up on JobHunt, build an impressive professional profile, and showcase your skills. A strong profile boosts your chances of landing interviews faster than ever!",
      active: false
    },
    {
      icon: <Search className="w-6 h-6 text-blue-600" />,
      title: "Search Best Jobs",
      desc: "Use JobHunt's advanced filters to explore thousands of opportunities. Find jobs that perfectly match your skills, experience, and career goals without wasting precious time.",
      active: true // Highlighted middle card from UI
    },
    {
      icon: <FileText className="w-6 h-6 text-white" />,
      title: "Apply In Seconds",
      desc: "Submit applications effortlessly through our streamlined system. Upload your resume, add a personalized message, and get your application to top employers within minutes!",
      active: false
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-white" />,
      title: "Get Hired Fast",
      desc: "Receive interview requests, negotiate offers, and start your new journey. JobHunt makes the hiring process fast, easy, and rewarding for every ambitious professional.",
      active: false
    }
  ];

  return (
    <section className="bg-[#f8fafc] py-16 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Follow Easy <span className="text-blue-600">4 Steps</span>
          </h2>
          <p className="text-slate-600 text-sm mt-1">Submit applications quickly through JobHunt’s user-friendly, streamlined platform.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={`p-6 rounded-2xl text-center flex flex-col items-center transition-all shadow-sm ${
                step.active 
                  ? "bg-blue-600 text-white shadow-lg scale-105 z-10" 
                  : "bg-white text-slate-800 border border-slate-200"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                step.active ? "bg-white text-blue-600" : "bg-blue-600 text-white"
              }`}>
                {step.icon}
              </div>
              
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className={`text-xs leading-relaxed ${step.active ? "text-blue-100" : "text-slate-600"}`}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;