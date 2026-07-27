import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <Header />

      <main className="flex-grow py-14 px-6 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Have questions or need assistance? Reach out to our support team anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Info Card */}
          <div className="bg-blue-600 text-white p-8 sm:p-10 rounded-3xl space-y-8 shadow-lg">
            <div>
              <h3 className="text-2xl font-bold">Contact Information</h3>
              <p className="text-blue-100 text-sm mt-1">We are here to support candidates and employers.</p>
            </div>

            <div className="space-y-6 text-sm">
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-blue-200" />
                <span>support@jobhunt.com</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-blue-200" />
                <span>+1 (800) 555-JOBHUNT</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="w-5 h-5 text-blue-200" />
                <span>Global Career Plaza, Suite 400</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900">Message Sent!</h3>
                <p className="text-slate-500 text-sm">Thank you for reaching out. We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-600 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-600 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows="4"
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-600 transition-all resize-y"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}