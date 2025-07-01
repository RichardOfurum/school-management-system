import React from 'react'
import ValueCard from './ValueCard'

const Values = () => {
  return (
    <div className='flex flex-col gap-10 my-10 bg-gradient-to-b from-white to-stone-50'>

        {/* top  */}
        <div className='flex flex-col gap-6 w-full items-center justify-center mt-10'>
            <h1 className='text-3xl font-bold text-center text-sky-950'>Our Core Values </h1>
            <p className='text-center text-gray-700  text-lg w-[90%] md:w-[80%] lg:w-[70%] text-sm'>These principles guide everything we do at Ridges International School, from shaping our curriculum to fostering an inclusive and empowering school culture.</p>
        </div>


        {/* bottom  */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-2 lg:p-4'>
           
            <ValueCard
                title="Excellence"
                description='Striving for the highest standards in everything we do.'
            />
            <ValueCard
                title="integrity"
                description='Upholding honesty, transparency, and ethical practices in all our actions.'
            />
            <ValueCard
                title="Innovation"
                description='Embracing creative solutions and staying ahead of the curve in educational practices.'
            />
            <ValueCard
                title="Collaboration"
                description='Working together as a community to build stronger relationships and foster mutual growth.'
            />
            <ValueCard
                title="Respect"
                description='Valuing each individual&quot;s uniqueness and promoting inclusivity in all our interactions. '
            />
            <ValueCard
                title="Community "
                description='Our Community is built to foster academic excellence and innovation that equips our students to build a competitive edge in our society.'
            />
        </div>
    </div>
  )
}

export default Values
