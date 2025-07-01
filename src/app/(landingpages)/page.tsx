"use client"

import Header from "@/components/landingpages/v1.0/Header";
import VibrantStudent from "@/components/landingpages/v1.0/VibrantStudent";
import WelcomeAcademy from "@/components/landingpages/v1.1/WelcomeAcademy";
import Story from "@/components/landingpages/v1.1/Story";
import Propriators from "@/components/landingpages/v1.1/Propriators";
import AcademicExcellence from "@/components/landingpages/v1.1/AcademicExcellence";
import Footer from "@/components/landingpages/v1.1/Footer";
import Hero from "@/components/landingpages/v1.1/Hero";
import JoinOurCommunity from "@/components/landingpages/v1.1/JoinOurCommunity";


const Homepage = () => {
  return (
    <>
        {/* <Header/> */}
        <div className="w-full bg-white">

          {/* Hero Section */}
          {/* <Hero/> */}
          {/* <HeroTwo/> */}
          <Hero/>

          {/* WelcomeAcademy Section */}
     
            <WelcomeAcademy />

            {/* <div className="w-full flex md:p-4  lg:p-10 items-center justify-center"> */}
            <Story/>
            {/* </div> */}

            <AcademicExcellence />

            {/* <VibrantStudent/> */}
            <Propriators/>

            <JoinOurCommunity/>

            <Footer/>
        </div>
    </>
  );
};

export default Homepage;