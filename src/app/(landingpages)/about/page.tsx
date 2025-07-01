"use client"

import React from 'react'
import Values from '@/components/landingpages/v1.0/Values'

import Footer from '@/components/landingpages/v1.1/Footer'
import JoinOurCommunity from '@/components/landingpages/v1.1/JoinOurCommunity'
import AboutHero from '@/components/landingpages/v1.1/AboutHero'
import AboutStory from '@/components/landingpages/v1.1/AboutStory'

const AboutPage = () => {
  return (
    <>
        <div className="w-full bg-white flex flex-col">

     
          <AboutHero/>
          {/* <HeroTwo/> */}

         <AboutStory/>

         <Values/>

         {/* <Team/> */}

        
          {/* <Facility/> */}
          <JoinOurCommunity/>
          <Footer/>
        </div>
    </>
 
  )
}

export default AboutPage