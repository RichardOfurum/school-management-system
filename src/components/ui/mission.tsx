import { Target } from 'lucide-react'
import React from 'react'

const mission = () => {
  return (
    <div className='bg-white w-fullcontainer flex flex-col items-center justify-center gap-6 py-10 px-2'>
        <div className='rounded-full p-4 bg-gray-100 cursor-pointer'>
            <Target className='text-blue-700'/>
        </div>
        <h1 className='font-bold text-2xl lg:text-4xl text-center'>Our Mission</h1>
        <p className='text-gray-800 text-center md:w-1/2'>
            Ridges International School is to provide a transformative eductional experience that nurtures intellectual resources curiosity, fosters personal growth, and empowers students to become compassionate, innovative, and responsible global citizens who make meaningful contributions to society.
        </p>
        <p className='italic text-sm text-gray-600'>
            "Education is not the filling of a pail, but the lighthing of a fire "
        </p>
        <span className='text-gray-700'>-- william butter yeats</span>
    </div>
  )
}

export default mission
