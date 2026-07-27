import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import LandingPage from '../pages/LandingPage/LandingPage';
import SignUp from '../pages/Auth/SignUp';
import Login from '../pages/Auth/Login';
import JobSeekerDashboard from '../pages/JobSeeker/JobSeekerDashboard';
import JobDetails from '../pages/JobSeeker/JobDetails';
import EmployerDashboard from '../pages/Employer/EmployerDashboard';
import ProtectedRoute from '../routes/ProtectedRoutes';

import AboutUs from '../pages/LandingPage/AboutUs';
import WhyUs from '../pages/LandingPage/WhyUs';
import Media from '../pages/LandingPage/Media';
import ContactUs from '../pages/LandingPage/ContactUs';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route path="/find-jobs" element={<JobSeekerDashboard />} />
          <Route path="/job/:jobId" element={<JobDetails />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/why-us" element={<WhyUs />} />
          <Route path="/media" element={<Media />} />
          <Route path="/contact-us" element={<ContactUs />} />

          {/* Protected Employer Routes */}
          <Route element={<ProtectedRoute requiredRole="employer" />}>
            <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          </Route>

          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>

      <Toaster toastOptions={{ className: '', style: { fontSize: '13px' } }} />
    </div>
  );
}

export default App;
