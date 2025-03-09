import React from 'react'
import ValueCard from './ValueCard'

const Facility = () => {
  return (
    <div className='flex flex-col gap-10 my-10 bg-white'>

        {/* top  */}
        <div className='flex flex-col gap-6 w-full items-center justify-center mt-10'>
            <h1 className='text-3xl font-bold text-center text-gray-800'>Our Facility </h1>
            <p className='text-center text-gray-700 '>Explore our state-of-the-art facilities designed to enhace the learning experience.</p>
        </div>


        {/* bottom  */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-10 p-10'>

                <div className="relative bg-[url('/herobg.png')] bg-cover bg-center h-60 flex flex-col justify-end items-start text-white p-2 md:p-4 rounded-lg">

                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-100 rounded-lg"></div>

                    <p className='z-10 font-semibold text-md md:text-2xl'>Modern Classrooms</p>
                    <p className='z-10 text-left font-light text-xs'>Equipped with the lates technology to support interactive and engaging learning experience</p>
                
                </div>

                <div className="relative bg-[url('/hero.png')] bg-cover bg-center h-60 flex flex-col justify-end items-start text-white p-2 md:p-4 rounded-lg">

                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-100 rounded-lg">

                    </div>

                    <p className='z-10 font-semibold text-md md:text-2xl'>Science Laboratories</p>
                    <p className='z-10 text-left font-light text-xs'>
                    Fully equipped labs for biology, chemisty and physics that enable hands-on experimentation and discovery.
                    </p>
                    
                </div>
                
                <div className="relative bg-[url('/hero.png')] bg-cover bg-center h-60 flex flex-col justify-end items-start text-white p-2 md:p-4 rounded-lg">

                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-100 rounded-lg">

                    </div>

                    <p className='z-10 font-semibold text-md md:text-2xl'>Library & Media Center</p>
                    <p className='z-10 text-left font-light text-xs'>
                    A comprehensive collection of books, digital resource and collaborative study space.
                    </p>
                    
                </div>
                
                <div className="relative bg-[url('/hero.png')] bg-cover bg-center h-60 flex flex-col justify-end items-start text-white p-2 md:p-4 rounded-lg">

                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-100 rounded-lg">

                    </div>

                    <p className='z-10 font-semibold text-md md:text-2xl'>Athletic Facilities</p>
                    <p className='z-10 text-left font-light text-xs'>
                    Including a gymnasium, swimming pool, tennis courts, and sports fields for various activities.
                    </p>
                    
                </div>
                
                <div className="relative bg-[url('/hero.png')] bg-cover bg-center h-60 flex flex-col justify-end items-start text-white p-2 md:p-4 rounded-lg">

                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-100 rounded-lg">

                    </div>

                    <p className='z-10 font-semibold text-md md:text-2xl'>Arts Center</p>
                    <p className='z-10 text-left font-light text-xs'>
                    Dedicated space for visual arts, music drama, and dance to nurture creativity and artistic expression.
                    </p>
                    
                </div>
                
                <div className="relative bg-[url('/hero.png')] bg-cover bg-center h-60 flex flex-col justify-end items-start text-white p-2 md:p-4 rounded-lg">

                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-100 rounded-lg">

                    </div>

                    <p className='z-10 font-semibold text-md md:text-2xl'>Technology Hub</p>
                    <p className='z-10 text-left font-light text-xs'>
                    Computer labs and makerspace that provide access to cutting-edge technology and foster innovation.
                    </p>
                    
                </div>

            </div>
 
    </div>
  )
}

export default Facility
