import React from 'react'
import FaqCard from './FaqCard';
import Link from 'next/link';

const Faq = () => {

    const faq = [
        {
            qeustion:"what are the school hours?",
            answer: "School hours are from 8 AM to 5 PM Monday to Friday. The administrative office is open from 8:00 AM to 4:30 PM on weekdays and 9:000 AM to 12:00 PM on Saturdays"
        },
        {
            qeustion:"How can i apply for admission?",
            answer: " lorem ipsum dolor sit amet con et lorem ipsum dolor sit amet con et lorem ipsum dolor sit amet con et  "
        },
        {
            qeustion:"Do you offer financial aid or scholarships?",
            answer: " lorem ipsum dolor sit amet con et lorem ipsum dolor sit amet con et lorem ipsum dolor sit amet con et  "
        },
    ];
  return (
    <div className='bg-white w-full flex flex-col items-center justify-center py-10'>

        <div className='w-full flex flex-col items-center justify-center text-center gap-4'>
            <h1 className='font-bold text-3xl'>Frequenty Asked Questions</h1>
            <p className='text-sm text-gray-700'>
                Find answers to common questions about Ridges International School
            </p>
        </div>

        <div className='flex flex-col gap-3 p-2 md:p-10 lg:w-[70%]'>
            {
                faq.map((item, index) => (
                    
                    <FaqCard 
                        key={index}
                        question={item.qeustion} 
                        answer={item.answer}
                    />
                    
                ))
            }
        </div>

        <Link href="/faq" className='text-gray-700 text-sm font-bold'>View all FAQs</Link>

    </div>
  )
}

export default Faq
