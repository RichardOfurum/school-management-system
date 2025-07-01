import React from 'react'
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

   
interface FaqType {
    question:string,
    answer:string,
}

    const faq:FaqType[] = [
        {
            question:"what are the school hours?",
            answer: "School hours are from 8 AM to 5 PM Monday to Friday. The administrative office is open from 8:00 AM to 4:30 PM on weekdays and 9:000 AM to 12:00 PM on Saturdays"
        },
        {
            question:"How can i apply for admission?",
            answer: " lorem ipsum dolor sit amet con et lorem ipsum dolor sit amet con et lorem ipsum dolor sit amet con et  "
        },
        {
            question:"Do you offer financial aid or scholarships?",
            answer: " lorem ipsum dolor sit amet con et lorem ipsum dolor sit amet con et lorem ipsum dolor sit amet con et  "
        },
    ];

const Faq = () => {

 
  return (
    <div className='bg-white w-full flex flex-col items-center justify-center py-10'>

        <div className='w-full flex flex-col items-center justify-center text-center gap-4'>
            <h1 className='font-bold text-3xl'>Frequenty Asked Questions</h1>
            <p className='text-sm text-gray-700 '>
                Find answers to common questions about Ridges International School
            </p>
        </div>


        {/* <div className='flex flex-col gap-3 p-2 md:p-10 lg:w-[70%]'>
            {
                faq.map((item, index) => (
                    
                    <FaqCard 
                        key={index}
                        question={item.qeustion} 
                        answer={item.answer}
                    />
                    
                ))
            }
        </div> */}

       <div className='w-full p-4 md:w-[90%] lg:w-[80%]'>
             {
            faq.map((item:FaqType) =>(
                <Accordion key={item.question} type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className='text-xl text-sky-950'>{item.question}</AccordionTrigger>
                        <AccordionContent className='font-mono'>
                        {
                            item.answer
                        }
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ))
        }
       </div>

        

        {/* <Link href="/faq" className='text-gray-700 text-sm font-bold'>View all FAQs</Link> */}

    </div>
  )
}

export default Faq
