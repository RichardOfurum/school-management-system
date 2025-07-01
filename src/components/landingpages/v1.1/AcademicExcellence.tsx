import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const AcademicExcellence = () => {
  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex items-end justify-between">
                <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-3xl font-bold leading-tight text-sky-950 sm:text-4xl lg:text-5xl">Academic Excellence</h2>
                    <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600 lg:mx-0"> Our comprehensive academic programs are designed to challenge, inspire, and prepare students for future success. </p>
                </div>    
            </div>

            <div className="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:grid-cols-3 lg:max-w-full">
                <div className="overflow-hidden bg-white rounded shadow">
                    <div className="p-5">
                        <div className="relative">
                            <Link href="/contact" title="" className="block aspect-w-4 aspect-h-3">
                                <Image 
                                width={500}
                                height={500}
                                className="object-cover w-full h-full" src="/creche.jpeg" alt="" />
                                
                            </Link>
                        </div>
                        <span className="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase"> September, 2025 </span>
                        <p className="mt-5 text-2xl font-semibold">
                            <Link href="#" title="" className="text-sky-950"> Crèche </Link>
                        </p>
                        <p className="mt-4 text-base text-gray-600">We provide early childhood education and care in line with the current academic trends with excellence and innovation.</p>
                        <Link href="/prospectus" title="" className="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-sky-950 transition-all duration-200 border-b-2 border-transparent hover:border-yellow-400 focus:border-yellow-400">
                            View Prospectus
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>

                <div className="overflow-hidden bg-white rounded shadow">
                    <div className="p-5">
                        <div className="relative">
                            <Link href="#" title="" className="block aspect-w-4 aspect-h-3">
                                <Image 
                                width={500}
                                height={500} className="object-cover w-full h-full" src="/primary.jpeg" alt="" />
                                
                            </Link>

                           
                        </div>
                        <span className="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase"> September, 2025 </span>
                        <p className="mt-5 text-2xl font-semibold">
                            <a href="#" title="" className="text-sky-950">Primary</a>
                        </p>
                        <p className="mt-4 text-base text-gray-600">We instill strong academic background that that prepares our pupil to for further learning, social skills and Respect.</p>
                        <Link href="/prospectus" title="" className="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-sky-950 transition-all duration-200 border-b-2 border-transparent hover:border-yellow-400 focus:border-yellow-400">
                            View Prospectus
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>

                <div className="overflow-hidden bg-white rounded shadow">
                    <div className="p-5">
                        <div className="relative">
                            <Link href="#" title="" className="block aspect-w-4 aspect-h-3">
                                <Image  
                                width={500}
                                height={500}
                                className="object-cover w-full h-full" src="/secondary.jpeg" alt="" />
                               
                            </Link>
 
                        </div>
                        <span className="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase"> September, 2025 </span>
                        <p className="mt-5 text-2xl font-semibold">
                            <Link href="#" title="" className="text-sky-950"> Secondary  </Link>
                        </p>
                        <p className="mt-4 text-base text-gray-600">Our Secondary help our students to solid their knowledge base and holistic development beyond the classroom activities.</p>
                        <Link href="/prospectus" title="" className="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-sky-950 transition-all duration-200 border-b-2 border-transparent hover:border-yellow-400 focus:border-yellow-400">
                            Continue Reading
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>   
        </div>
    </section>

  )
}

export default AcademicExcellence
