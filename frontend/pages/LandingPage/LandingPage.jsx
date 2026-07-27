import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import TrustedPlatform from "./components/TrustedPlatform";
import JobOpportunities from "./components/JobOpportunities";
import HowItWorks from "./components/HowItWorks";
import VideoSuccessStories from "./components/VideoSuccessStories";
import Testimonials from "./components/Testimonials";
import ConnectSection from "./components/ConnectSection";
import JobsByLocation from "./components/JobsByLocation";


const LandingPage = () => {
  return (
  
    <div className='min-h-screen bg-[#f8fafc] flex flex-col'>
      <Header />

      <main className="flex-grow">
        <HeroSection />
        <TrustedPlatform />
        <JobOpportunities />
        <HowItWorks />
        <VideoSuccessStories />
        <Testimonials />
        <ConnectSection />
        <JobsByLocation />
      </main>

      <Footer />
    </div>
  )
}

export default LandingPage