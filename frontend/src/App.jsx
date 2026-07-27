import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import LandingPage from '../pages/LandingPage/LandingPage';
import SignUp from '../pages/Auth/SIgnUp';
import Login from '../pages/Auth/Login';
import JobSeekerDashboard from '../pages/JobSeeker/JobSeekerDashboard';
import JobDetails from '../pages/JobSeeker/JobDetails';
import SavedJobs from '../pages/JobSeeker/SavedJobs';
import UserProfile from '../pages/JobSeeker/UserProfile';
import EmployerDashboard from '../pages/Employer/EmployerDashboard';
import JobPostingForm from '../pages/Employer/JobPostingForm';
import ManageJobs from '../pages/Employer/ManageJobs';
import ApplicationViewer from '../pages/Employer/ApplicationViewer';
import EmployerProfilePage from '../pages/Employer/EmployerProfilePage';
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
        //public pages
    
        <Route path="/" element={<LandingPage />} /> //home page 1
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} /> 

        <Route path="/find-jobs" element={<JobSeekerDashboard />} /> //find jobs 2
        <Route path="/job/:jobId" element={<JobDetails />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/about-us" element={<AboutUs />} /> //about-us 3 
        <Route path="/why-us" element={<WhyUs />} /> //why-us 4
        <Route path="/media" element={<Media />} /> //media 5
        <Route path="/contact-us" element={<ContactUs />} /> //contact-us 


        //Protected Routes 
        <Route element={<ProtectedRoute requiredRole="employer" />}>
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/post-job" element={<JobPostingForm />} />
          <Route path="/manage-jobs" element={<ManageJobs />} />
          <Route path="/applicants" element={<ApplicationViewer />} />
          <Route path="/company-profile" element={<EmployerProfilePage />} />
        </Route>

        //catch all route
        <Route path="*" element={<Navigate to="/" replace/>} />
      </Routes>
    </Router>


    <Toaster toastOptions={{className:"",style:{frontSize:"13px"},}}  />
  
   </div>
  )
}

export default App
