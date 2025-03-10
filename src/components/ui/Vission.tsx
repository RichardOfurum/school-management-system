import { BookOpen } from 'lucide-react'
import React from 'react'

const Vission = () => {
  return (
    <div className='flex flex-col items-center justify-center bg-gray-50 p-2 lg-p-10 gap-6'>
        <div className="bg-gray-100 p-4 cursor-pointer rounded-full">
            <BookOpen className='text-blue-700'/>
        </div>
        <h1 className='text-3xl font-bold'>Our Vision</h1>
        <p className='text-gray-700 md:w-1/2 text-center'>
            We envisionRidges International School as a dynamic learning community where students thrive academically, socially, and emotionally, developing the knowledge, skills, and character needed to navigate and ever-changing world with confidence and purpose.
        </p>

        <div className='flex flex-col md:flex-row gap-4 md:w-1/2'>

            <div className='bg-white p-6 flex flex-col gap-4 rounded-md'>
                <h1 className="font-bold text-xl">For Our Students</h1>
                <p className='text-gray-700 text-sm'>We strive to create students who are critical thinkers, effective communicators, and ethical leaders prespared to excel in collage and beyond</p>
            </div>

            <div className='bg-white p-6 flex flex-col gap-4 rounded-md'>
                <h1 className="font-bold text-xl">For Our Community</h1>
                <p className='text-gray-700 text-sm'>We aim to be a center of educational excellence that contributes positively to our local community and the broader educational landscaped</p>
            </div>
        </div>
    </div>
  )
}

export default Vission
