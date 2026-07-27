import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Find Jobs', path: '/find-jobs' },
    { name: 'Why Us', path: '/why-us' },
    { name: 'Testimonial', path: '/testimonial' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  return (
    <footer className="bg-[#0b4d96] text-white font-sans">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6">
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-1.5 rounded-full bg-white text-[#0b4d96] flex items-center justify-center">
                <Briefcase className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-3xl font-bold tracking-tight text-white">
                jobhunt
              </span>
            </Link>

            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
              Job Hunt Placement is a trusted recruitment agency with over 20 years of experience,
              connecting skilled candidates with top employers in various industries, both in India
              and abroad, for optimal career success.
            </p>

            <div className="pt-2">
              <Link
                to="/signup"
                className="inline-block bg-white text-[#0b4d96] font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-blue-50 transition-colors shadow-sm"
              >
                Apply Now Today!
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold tracking-wide">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors"
                  >
                    <span className="text-slate-300 font-mono">&gt;</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold tracking-wide">Contact Information</h3>
            <div className="space-y-3 text-sm text-slate-200">
              
              <a 
                href="https://wa.me/911234567890" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <MessageSquare className="w-5 h-5 flex-shrink-0 text-white" />
                <span>+91 12345 67890</span>
              </a>

              <a 
                href="tel:+911234567890" 
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5 flex-shrink-0 text-white" />
                <span>+91 12345 67890</span>
              </a>

              <a 
                href="mailto:youremail@gmail.com" 
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5 flex-shrink-0 text-white" />
                <span>youremail@gmail.com</span>
              </a>

              {/* Static Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 text-white mt-0.5" />
                <span className="text-xs sm:text-sm leading-relaxed">
                  Job Hunt Placement, Parras Kunj Building, Ground Floor, Behind Biswadip Cinema Hall, Landmark-Darjeeling Tea Traders Siliguri, 734003
                </span>
              </div>

            </div>
          </div>

          {/* Column 4: Location Display & Social Links */}
          <div className="space-y-6">
            {/* Static Location Card */}
            <div className="w-full h-36 rounded-lg bg-blue-900/40 border border-blue-400/30 flex items-center justify-center shadow-md relative overflow-hidden">
              <div className="text-center p-4">
                <MapPin className="w-8 h-8 text-white mx-auto mb-1" />
                <span className="text-xs text-slate-200 font-medium block">Siliguri, West Bengal</span>
                <span className="text-[10px] text-blue-200 uppercase tracking-widest mt-0.5 block">Head Office</span>
              </div>
            </div>

            {/* Social Links with Inline SVGs */}
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold tracking-wide">Follow Us</span>
              <div className="flex items-center gap-3">
                {/* Facebook SVG */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#0b4d96] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram SVG */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#0b4d96] transition-colors"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>

                {/* LinkedIn SVG */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#0b4d96] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Divider line */}
        <hr className="border-blue-400/30 my-8" />

        {/* Bottom Copyright Section */}
        <div className="text-center text-xs sm:text-sm text-slate-200">
          © Copyright JobHunt - 2025 All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;