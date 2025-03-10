import React from 'react'
import ValueCard from './ValueCard'

const Values = () => {
  return (
    <div className='flex flex-col gap-10 my-10 bg-gray-50'>

        {/* top  */}
        <div className='flex flex-col gap-6 w-full items-center justify-center mt-10'>
            <h1 className='text-3xl font-bold text-center text-gray-800'>Our Core Values </h1>
            <p className='text-center text-gray-700 '>These principles guide everything we do at Ridges International School, from curriculum development to daily interactions.</p>
        </div>


        {/* bottom  */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-2 lg:p-4'>
           
            <ValueCard
                title="Excellence"
                description='We stive excellence in all aspect of education, challanging students to rech their highest potential.'
            />
            <ValueCard
                title="integrity"
                description='We foster honesty, ethics, and responsibility in out students, staff, and institutional practices.'
            />
            <ValueCard
                title="Innovation"
                description='We embrace thinking and innovative approach to teaching and learning.'
            />
            <ValueCard
                title="Inclusivity"
                description='We celebrate diversity and create an inclusive environment where student feel valued and respected.'
            />
            <ValueCard
                title="Community"
                description='We build strong relationships among students families, staff, and the broader community.'
            />
            <ValueCard
                title="Lifelong Learning"
                description='We instill a passion for continious learning and intellectual growth that extends beyond the classroom.'
            />
          
        </div>
    </div>
  )
}

export default Values
