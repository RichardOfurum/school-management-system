"use client"
import WelcomeAcademy from "@/components/ui/WelcomeAcademy";
import Header from "@/components/ui/Header";
import Story from "@/components/ui/Story";
import AcademicExcellence from "@/components/ui/AcademicExcellence";
import VibrantStudent from "@/components/ui/VibrantStudent";
import Hero from "@/components/ui/Hero";
import JoinOurCommunity from "@/components/ui/JoinOurCommunity";
import Footer from "@/components/ui/Footer";

const Homepage = () => {
  return (
    <>
        <Header/>
        <div className="w-full bg-white">

          {/* Hero Section */}
          <Hero/>

          {/* WelcomeAcademy Section */}
     
            <WelcomeAcademy />

            <div className="w-full p-4 flex md:p-10  lg:p-20 items-center justify-center">
            <Story/>
            </div>

            <AcademicExcellence />

            <VibrantStudent/>

            <JoinOurCommunity/>

            <Footer/>
        </div>
    </>
  );
};

export default Homepage;