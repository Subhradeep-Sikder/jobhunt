import React from 'react';

const JobsByLocation = () => {
  const locations = [
    { country: "India", vacancies: "76 Vacancy", flag: "🇮🇳" },
    { country: "USA", vacancies: "20 Vacancy", flag: "🇺🇸" },
    { country: "New Zealand", vacancies: "16 Vacancy", flag: "🇳🇿" },
    { country: "Canada", vacancies: "34 Vacancy", flag: "🇨🇦" }
  ];

  return (
    <section className="bg-[#f8fafc] py-16 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Jobs by <span className="text-blue-600">Location</span>
          </h2>
          <p className="text-slate-600 text-sm mt-1">Find your favourite jobs and get the benefits of yourself</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex items-center gap-4 cursor-pointer"
            >
              <div className="text-4xl p-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center">
                {loc.flag}
              </div>
              <div>
                <h4 className="font-bold text-blue-600 text-lg">{loc.country}</h4>
                <span className="text-xs font-medium text-slate-500">{loc.vacancies}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default JobsByLocation;