import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Zap, CheckCircle2, Award, Clock } from 'lucide-react';

export default function WhyUs() {
  const reasons = [
    { title: "Direct Employer Connections", desc: "No middleman delays. Connect directly with hiring managers.", icon: Zap },
    { title: "Verified Listings", desc: "Every job opening is authenticated and reviewed before publication.", icon: CheckCircle2 },
    { title: "Integrated Media & Sliders", desc: "Employers present authentic workplace culture through rich media.", icon: Award },
    { title: "Real-Time Application Status", desc: "Track application progress with immediate employer feedback.", icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <Header />

      <main className="flex-grow py-14 px-6 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Why Choose <span className="text-blue-600">JobHunt</span>?
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            The next-generation career portal built for transparency, speed, and modern hiring standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-5">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900">{r.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{r.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}