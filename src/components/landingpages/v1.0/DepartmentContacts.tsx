import React from 'react'
import ContactCard from './ContactCard'

const DepartmentContacts = () => {
  return (
    <div className='w-full flex flex-col items-center bg-gray-100 py-10'>
        <div className='flex flex-col items-center justify-center text-center gap-4'>
            <h1 className='text-3xl font-bold'>Department Cantacts</h1>
            <p className='text-sm'>Contact with specific departments for speciallized inquires.</p>
        </div>
        
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-3 p-2 md:p-4 lg:p-10'>
            <ContactCard
                title="Admission"
                description="For inquries about the application proccess, campus tours, and enrolment, "
                email ="ridge@gmail.com"
                phone = "+2349128736284"
            />

            <ContactCard
                title="Academic Affairs"
                description="For inquries about the application proccess, campus tours, and enrolment, "
                email ="ridge@gmail.com"
                phone = "+2349128736284"
            />

            <ContactCard
                title="Student Services"
                description="For inquries about the application proccess, campus tours, and enrolment, "
                email ="ridge@gmail.com"
                phone = "+2349128736284"
            />
           
            <ContactCard
                title="Athletics"
                description="For inquries about the application proccess, campus tours, and enrolment, "
                email ="ridge@gmail.com"
                phone = "+2349128736284"
            />
            
            <ContactCard
                title="Finance & Billing"
                description="For inquries about the application proccess, campus tours, and enrolment, "
                email ="ridge@gmail.com"
                phone = "+2349128736284"
            />
            
            <ContactCard
                title="Alumni Relations"
                description="For inquries about the application proccess, campus tours, and enrolment, "
                email ="ridge@gmail.com"
                phone = "+2349128736284"
            />
            
        </div>

    </div>
  )
}

export default DepartmentContacts
