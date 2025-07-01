import { BookOpen } from 'lucide-react'
import React from 'react'

const Vission = () => {
  return (
    <div className='flex flex-col items-center justify-center bg-gray-50 py-24 lg-p-10 gap-6'>
        <div className="bg-gray-100 p-4 cursor-pointer rounded-full">
            <BookOpen className='text-sky-950'/>
        </div>
        <h1 className='font-bold text-2xl lg:text-6xl text-center text-sky-950'>Our Vision</h1>
        <p className='text-gray-700 md:w-1/2 text-center '>
            We envision Ridges International School as a beacon of excellence in education, where every student is empowered to embrace challenges and seize opportunities with resilience and confidence. Our vision is to create a vibrant community of forward-thinking individuals who are equipped to adapt to and lead in a rapidly changing world. Through academic excellence, personal growth, and strong ethical values, we aim to shape the leaders of tomorrow who will make meaningful contributions to a better global society.
        </p>

        <div className='flex flex-col md:flex-row gap-4 md:w-1/2'>

            <div className='bg-white p-6 flex flex-col gap-4 rounded-md'>
                <h1 className="font-bold text-xl text-sky-950">For Our Students</h1>
                <p className='text-gray-700 text-sm'>We are dedicated to nurturing students who are not only academically proficient but also curious thinkers, resilient problem-solvers, and empathetic individuals. Our goal is to prepare them to excel in a rapidly changing world by fostering leadership, creativity, and effective communication skills that go beyond the classroom.</p>
            </div>

            <div className='bg-white p-6 flex flex-col gap-4 rounded-md'>
                <h1 className="font-bold text-xl text-sky-950">For Our Community</h1>
                <p className='text-gray-700 text-sm'>We strive to be a leading educational institution that actively contributes to the local community and the broader world. Through community engagement, service, and sustainable initiatives, we aim to create a school environment that reflects our commitment to social responsibility, diversity, and educational excellence.</p>
            </div>
        </div>
    </div>
  )
}

export default Vission
