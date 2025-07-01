import { Target } from 'lucide-react'
import React from 'react'

const mission = () => {
  return (
    <div className='bg-white w-fullcontainer flex flex-col items-center justify-center gap-6 py-10 px-2'>
        <div className='rounded-full p-4 bg-gray-100 cursor-pointer'>
            <Target className='text-sky-950'/>
        </div>
        <h1 className='font-bold text-2xl lg:text-6xl text-center text-sky-950'>Our Mission</h1>
        <p className='text-gray-800 text-center md:w-1/2 text-md'>
            At Ridges International School, our mission is to provide an exceptional education that inspires young minds to reach their full potential. We are dedicated to cultivating a passion for learning, nurturing creativity, and fostering intellectual curiosity. We equip our students with the skills, knowledge, and values needed to become compassionate, innovative, and responsible leaders who will positively impact society and the world.
        </p>
        <p className='italic text-sm text-gray-600'>
        &quot; The function of education is to teach one to think intensively and to think critically. &quot;
        </p>
        <span className='text-gray-700'>-- Dr. Martin Luther King Jr.</span>
    </div>
  )
}

export default mission
