import React from 'react'
import ValueCard from './ValueCard'
import TeamCard from './TeamCard'

const Team = () => {
  return (
    <div className='flex flex-col gap-10 my-10 bg-white'>

        {/* top  */}
        <div className='flex flex-col gap-6 w-full items-center justify-center mt-10'>
            <h1 className='text-3xl font-bold text-center text-gray-800'>Our Leadership Team </h1>
            <p className='text-center text-gray-700 '>Meet the dedicated professionals who guide our institution with vission and experience.</p>
        </div>

        {/* bottom  */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2 lg:p-28'>
           
            <TeamCard
                img="/herobg.png"
                title="Dr. Michael Reynolds"
                role="Principal"
                description='with over 20 year of experience in education Dr. Reynolds leads Ridges International School with a focus on innovation and academic excellence.'
            />
            <TeamCard
                img="/herobg.png"
                title="Dr. Michael Reynolds"
                role="Principal"
                description='with over 20 year of experience in education Dr. Reynolds leads Ridges International School with a focus on innovation and academic excellence.'
            />
            <TeamCard
                img="/herobg.png"
                title="Dr. Michael Reynolds"
                role="Principal"
                description='with over 20 year of experience in education Dr. Reynolds leads Ridges International School with a focus on innovation and academic excellence.'
            />
            <TeamCard
                img="/herobg.png"
                title="Dr. Michael Reynolds"
                role="Principal"
                description='with over 20 year of experience in education Dr. Reynolds leads Ridges International School with a focus on innovation and academic excellence.'
            />
            <TeamCard
                img="/herobg.png"
                title="Dr. Michael Reynolds"
                role="Principal"
                description='with over 20 year of experience in education Dr. Reynolds leads Ridges International School with a focus on innovation and academic excellence.'
            />
            <TeamCard
                img="/herobg.png"
                title="Dr. Michael Reynolds"
                role="Principal"
                description='with over 20 year of experience in education Dr. Reynolds leads Ridges International School with a focus on innovation and academic excellence.'
            />
          
        </div>
    </div>
  )
}

export default Team
