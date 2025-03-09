"use client"
import React from 'react';
import Image from "next/image";
import MiniStory from './MiniStory';

const AboutStory = () => {
  return (
    <div className='flex flex-col gap-10 my-10'>

        {/* top  */}
        <div className='flex flex-col gap-6 w-full items-center justify-center'>
            <h1 className='text-3xl font-bold text-center text-gray-800'>Our Story</h1>
            <p className='text-center text-gray-700 '>The journey of Ridges International School from its humble beginnings to becoming a leaing educational institution.</p>
        </div>


        {/* bottom  */}
        <div className='flex flex-col gap-10'>
            <MiniStory
                floatToLeft={true}
                title="Founded on a Vission"
                img="/herobg.png"
                description="lorem ipsum dolor sit amet erat, consectetur adipiscing elitnatural element nunc sed diam nonumy eirmod tempor invidunt ut labore et dol chains lore lorem ipsum dolor sit amet erat, consectetur adipiscing elitnatural element nunc sed diam nonumy eirmod tempor invidunt ut labore et dol chains lore"
            />

            <MiniStory
                floatToLeft={false}
                title="Growth and Evolution"
                img="/herobg.png"
                description="lorem ipsum dolor sit amet erat, consectetur adipiscing elitnatural element nunc sed diam nonumy eirmod tempor invidunt ut labore et dol chains lore lorem ipsum dolor sit amet erat, consectetur adipiscing elitnatural element nunc sed diam nonumy eirmod tempor invidunt ut labore et dol chains lore"
            />

          <MiniStory
                floatToLeft={true}
                title="Our Legacy of Excellence"
                img="/herobg.png"
                description="lorem ipsum dolor sit amet erat, consectetur adipiscing elitnatural element nunc sed diam nonumy eirmod tempor invidunt ut labore et dol chains lore lorem ipsum dolor sit amet erat, consectetur adipiscing elitnatural element nunc sed diam nonumy eirmod tempor invidunt ut labore et dol chains lore"
            />
        </div>
    </div>
  )
}

export default AboutStory
