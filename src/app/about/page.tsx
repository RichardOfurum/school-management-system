"use client"
import Header from '@/components/ui/Header'
import React from 'react'

import Footer from '@/components/ui/Footer'
import AboutHero from '@/components/ui/AboutHero'
import AboutStory from '@/components/ui/AboutStory'
import Hero from '@/components/ui/Hero'
import Values from '@/components/ui/Values'
import Team from '@/components/ui/Team'
import Facility from '@/components/ui/Facility'
import JoinOurCommunity from '@/components/ui/JoinOurCommunity'

const AboutPage = () => {
  return (
    <>
        <Header/>
        <div className="w-full bg-white flex flex-col">

     
          <AboutHero/>
          {/* <HeroTwo/> */}

         <AboutStory/>

         <Values/>

         <Team/>

        
          <Facility/>
          <JoinOurCommunity/>
          <Footer/>
        </div>
    </>
 
  )
}

export default AboutPage