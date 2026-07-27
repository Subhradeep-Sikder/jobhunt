import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    // Mock state (Replace with your actual Auth state / Redux / Context)
    const isAuthenticated = false;
    const user = { fullName: "example", role: "employer" };

    const navigate = useNavigate();
    const isEmployer = isAuthenticated && user?.role === "employer";

    return (
        <header className="w-full bg-[#f8fafc] border-b border-slate-200/60 font-sans">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    
                    {/* Logo */}
                    <div 
                        onClick={() => navigate("/")} 
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <div className="p-1.5 rounded-lg text-blue-600 flex items-center justify-center">
                            <Briefcase className="w-6 h-6 stroke-[2.5]" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-slate-900">
                            jobhunt
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex items-center gap-8">
                        {isEmployer ? (
                            
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-slate-700">
                                    Welcome, {user?.fullName}
                                </span>
                                <button
                                    onClick={() => navigate("/employer-dashboard")}
                                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
                                >
                                    Dashboard
                                </button>
                            </div>
                        ) : (
                            
                            <>
                                <a 
                                    onClick={() => navigate("/")} 
                                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 cursor-pointer transition-colors"
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
                                <div className="ml-2">
                                    {isAuthenticated ? (
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-medium text-slate-700">
                                               Welcome,{user?.fullName}
                                            </span>
                                            <button 
                                                onClick={() => navigate("/find-jobs")} 
                                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
                                            >
                                                Dashboard
                                            </button>
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={() => navigate("/login")} 
                                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
                                        >
                                            Apply Now
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </nav>

                </div>
            </div>
        </header>
    );
};

export default Header;