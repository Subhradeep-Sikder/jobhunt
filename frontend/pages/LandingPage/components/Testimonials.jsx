import React from 'react';
import { User } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: "Ananya Roy",
      review: "Job Hunt Placement helped me land my dream job within weeks. The team was professional, attentive, and guided me at every step. Highly recommended!",
      active: false
    },
    {
      name: "Pradeep Gurung",
      review: "Excellent service! Job Hunt Placement's team provided valuable guidance throughout the hiring process. They connected me with a great company. Thank you!",
      active: true // Highlighted blue card from UI
    },
    {
      name: "Madhusree Chatterjee",
      review: "Very satisfied with the services! The consultants were helpful and always available for advice. They helped me secure a fantastic job. Truly grateful!",
      active: false
    },
    {
      name: "Hari Bahadur Rai",
      review: "Job Hunt Placement is truly reliable. They took the time to understand my skills and connected me with a top employer. Very professional and supportive!",
      active: false
    }
  ];

  return (
    <section className="bg-[#f8fafc] py-16 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Success <span className="text-blue-600">Stories</span> Galore
          </h2>
          <p className="text-slate-600 text-sm mt-1">JobHunt transformed dreams into reality with perfect career matches.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, idx) => (
            <div 
              key={idx} 
              className={`p-6 rounded-2xl text-center flex flex-col items-center justify-between shadow-sm transition-all ${
                rev.active 
                  ? "bg-blue-600 text-white shadow-md scale-105 z-10" 
                  : "bg-white text-slate-800 border border-slate-200"
              }`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-inner ${
                rev.active ? "bg-white text-blue-600" : "bg-blue-600 text-white"
              }`}>
                <User className="w-7 h-7" />
              </div>
              
              <h4 className="font-bold text-lg mb-2">{rev.name}</h4>
              <p className={`text-xs leading-relaxed ${rev.active ? "text-blue-100" : "text-slate-600"}`}>
                "{rev.review}"
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;