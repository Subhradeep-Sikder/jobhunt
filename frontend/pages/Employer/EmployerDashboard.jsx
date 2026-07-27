import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  PlusCircle,
  Image as ImageIcon,
  Sliders,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import AddJobForm from './components/AddJobForm';
import ManageJobs from './components/ManageJobs';
import Media from './components/Media';
import SliderComponent from './components/Slider';

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sliders');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fullName = localStorage.getItem('fullName') || 'Employer Account';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');
    window.location.href = '/login';
  };

  const navItems = [
    { id: 'sliders', label: 'Hero Sliders', icon: Sliders },
    { id: 'manage-jobs', label: 'Job Management', icon: Briefcase },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans flex flex-col">
      {/* Top Header Navigation Bar */}
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo */}
            <div 
              onClick={() => navigate("/")} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
                <Briefcase className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900 block leading-tight">
                  job<span className="text-blue-600">hunt</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-400 block tracking-wider uppercase">
                  Employer Manager
                </span>
              </div>
            </div>

            {/* Desktop Horizontal Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* User Info & Logout */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="w-6 h-6 bg-blue-100 text-blue-700 font-bold rounded-lg flex items-center justify-center text-xs">
                  {fullName.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-bold text-slate-800 max-w-[120px] truncate">
                  {fullName}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-2">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 truncate">{fullName}</span>
              <button
                onClick={handleLogout}
                className="text-xs font-semibold text-red-600 hover:text-red-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'manage-jobs' && (
              <ManageJobs onNavigateToAddJob={() => setActiveTab('add-job')} />
            )}
            {activeTab === 'add-job' && (
              <AddJobForm onSuccess={() => setActiveTab('manage-jobs')} onCancel={() => setActiveTab('manage-jobs')} />
            )}
            {activeTab === 'media' && <Media />}
            {activeTab === 'sliders' && <SliderComponent />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default EmployerDashboard;