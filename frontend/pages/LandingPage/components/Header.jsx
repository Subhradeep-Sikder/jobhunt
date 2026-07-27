import React from 'react';
import { Briefcase, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const fullName = localStorage.getItem('fullName') || 'User';
    const isAuthenticated = Boolean(token);
    const isEmployer = isAuthenticated && role === 'employer';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('fullName');
        navigate('/');
    };

    return (
        <header className="w-full bg-white border-b border-slate-200/80 font-sans sticky top-0 z-30 shadow-xs">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    
                    {/* Logo */}
                    <div 
                        onClick={() => navigate("/")} 
                        className="flex items-center gap-2 cursor-pointer group"
                    >
                        <div className="p-2 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
                            <Briefcase className="w-5 h-5 stroke-[2.5]" />
                        </div>
                        <span className="text-2xl font-black tracking-tight text-slate-900">
                            job<span className="text-blue-600">hunt</span>
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex items-center gap-6">
                        <a 
                            onClick={() => navigate("/")} 
                            className="text-sm font-medium text-slate-700 hover:text-blue-600 cursor-pointer transition-colors"
                        >
                            Home
                        </a>
                        <a 
                            onClick={() => navigate("/find-jobs")} 
                            className="text-sm font-medium text-slate-700 hover:text-blue-600 cursor-pointer transition-colors"
                        >
                            Find Jobs
                        </a>
                        <a 
                            onClick={() => navigate("/about-us")} 
                            className="text-sm font-medium text-slate-700 hover:text-blue-600 cursor-pointer transition-colors"
                        >
                            About Us
                        </a>
                        <a 
                            onClick={() => navigate("/why-us")} 
                            className="text-sm font-medium text-slate-700 hover:text-blue-600 cursor-pointer transition-colors"
                        >
                            Why Us
                        </a>
                        <a 
                            onClick={() => navigate("/media")} 
                            className="text-sm font-medium text-slate-700 hover:text-blue-600 cursor-pointer transition-colors"
                        >
                            Media
                        </a>
                        <a 
                            onClick={() => navigate("/contact-us")} 
                            className="text-sm font-medium text-slate-700 hover:text-blue-600 cursor-pointer transition-colors"
                        >
                            Contact Us
                        </a>

                        {/* Auth Action */}
                        <div className="ml-2 flex items-center gap-3">
                            {isAuthenticated ? (
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                                       {fullName} ({role === 'employer' ? 'Employer' : 'Job Seeker'})
                                    </span>
                                    <button 
                                        onClick={() => navigate(isEmployer ? "/employer-dashboard" : "/find-jobs")} 
                                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer shadow-sm"
                                    >
                                        Dashboard
                                    </button>
                                    <button 
                                        onClick={handleLogout}
                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                                        title="Sign Out"
                                    >
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => navigate("/login")} 
                                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
                                >
                                    Apply Now
                                </button>
                            )}
                        </div>
                    </nav>

                </div>
            </div>
        </header>
    );
};

export default Header;